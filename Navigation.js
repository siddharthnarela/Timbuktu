import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScrollScreen from './screens/ScrollScreen';
import { AntDesign, Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Profile from './screens/Profile';
import Plus from './screens/Plus';
import Search from './screens/Search';

export default function Navigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          elevation: 0,
          backgroundColor: 'black',
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 80 : 50,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="ScrollScreen" 
        component={ScrollScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Octicons 
                name="home" 
                size={24} 
                color={focused ? "white" : "white"} 
              />
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name="Search" 
        component={Search}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Feather name="search" size={25} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Plus" 
        component={Plus}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <AntDesign name="pluscircleo" size={24} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialCommunityIcons name="face-man-profile" size={26} color="white" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}