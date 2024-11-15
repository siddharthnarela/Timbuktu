import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 120 : 100;
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;

export default function Profile() {
  const [activeTab, setActiveTab] = useState('photos');

  
  const user = {
    name: 'Sarah Anderson',
    username: '@sarahanderson',
    bio: 'Travel photographer & Visual storyteller 📸 ✈️\nExploring the world one frame at a time',
    location: 'San Francisco, CA',
    followers: '125.4K',
    following: '892',
    likes: '2.1M',
    posts: '487',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    verified: true,
  };

  const renderProfileInfo = () => (
    <View style={styles.profileInfo}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={styles.verifiedBadge}>
          <MaterialCommunityIcons name="check-decagram" size={24} color="#3285FF" />
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>

      <Text style={styles.bio}>{user.bio}</Text>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="#fff" />
        <Text style={styles.location}>{user.location}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.likes}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Feather name="message-circle" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Feather name="share" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
        onPress={() => setActiveTab('photos')}
      >
        <FontAwesome5
          name="th"
          size={20}
          color={activeTab === 'photos' ? '#3285FF' : '#fff'}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'photos' && styles.activeTabText,
          ]}
        >
          Photos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
        onPress={() => setActiveTab('likes')}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={24}
          color={activeTab === 'likes' ? '#3285FF' : '#fff'}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'likes' && styles.activeTabText,
          ]}
        >
          Likes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
        onPress={() => setActiveTab('saved')}
      >
        <Feather
          name="bookmark"
          size={22}
          color={activeTab === 'saved' ? '#3285FF' : '#fff'}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'saved' && styles.activeTabText,
          ]}
        >
          Saved
        </Text>
      </TouchableOpacity>
    </View>
  );


  const photos = Array(15).fill({
    uri: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e',
    likes: Math.floor(Math.random() * 10000),
  });

  const renderPhotoGrid = () => (
    <View style={styles.photoGrid}>
      {photos.map((photo, index) => (
        <TouchableOpacity key={index} style={styles.photoItem}>
          <Image source={{ uri: photo.uri }} style={styles.gridPhoto} />
          <View style={styles.photoOverlay}>
            <View style={styles.photoStats}>
              <MaterialCommunityIcons name="heart" size={16} color="#fff" />
              <Text style={styles.photoLikes}>
                {(photo.likes / 1000).toFixed(1)}k
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT,
        }}
      >
        {renderProfileInfo()}
        {renderTabs()}
        {renderPhotoGrid()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  profileInfo: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },
  profileImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#000',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 2,
  },
  nameContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#999',
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  followButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#3285FF',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3285FF',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3285FF',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  photoItem: {
    width: (width - 3) / 3,
    height: (width - 3) / 3,
    margin: 0.5,
    position: 'relative',
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  photoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoLikes: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
});