import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
const ITEM_HEIGHT = height - TAB_BAR_HEIGHT;

export default function ScrollScreen() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [likedPhotos, setLikedPhotos] = useState(new Set());

  const UNSPLASH_API_KEY = 'K6ciw_hvBL2MWdCULOIXEVhh5U-lVZLfJovwkLKAwbQ';

  const fetchPhotos = async (refresh = false) => {
    if (!refresh && loading) return;

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=10`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_API_KEY}`
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch photos');

      const newPhotos = await response.json();
      
      if (refresh) {
        setPhotos(newPhotos);
      } else {
        setPhotos(prev => [...prev, ...newPhotos]);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPhotos(true);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos(true);
  };

  const onLikePress = (photoId) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const renderPhoto = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.photoContainer, { height: ITEM_HEIGHT }]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <Image
            source={{ uri: item.urls.regular }}
            style={styles.photo}
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />

          <View style={[styles.interactionContainer, { bottom: Platform.OS === 'ios' ? 140 : 120 }]}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onLikePress(item.id)}
            >
              <MaterialCommunityIcons
                name={likedPhotos.has(item.id) ? 'heart' : 'heart-outline'}
                size={32}
                color={likedPhotos.has(item.id) ? '#ff4444' : '#fff'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="share" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={[styles.photoInfo, { paddingBottom: TAB_BAR_HEIGHT }]}>
            <View style={styles.photographerContainer}>
              <Image
                source={{ uri: item.user.profile_image.medium }}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.photographerName}>{item.user.name}</Text>
                <Text style={styles.locationText}>
                  {item.location?.name || 'Around the world'}
                </Text>
              </View>
            </View>
            
            {item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
        </Animated.View>
      </View>
    );
  };

  if (loading && !photos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading amazing photos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Animated.FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onEndReached={() => fetchPhotos()}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  photoContainer: {
    width,
    overflow: 'hidden',
  },
  animatedContainer: {
    flex: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  interactionContainer: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  photoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  photographerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#2a2a2a',
  },
  textContainer: {
    flex: 1,
  },
  photographerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginTop: 8,
  },
});