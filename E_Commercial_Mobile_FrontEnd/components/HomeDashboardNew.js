import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUp from './SignUp';
import Explore from './Explore';
import ProductDetails from './ProductDetails';
import CartScreen from './CartScreen';
import ProductType from './ProductType';
import SearchScreen from './SearchScreen';
import Signin from './Signin';
import AccountScreen from './AccountScreen';
import OrderAcceptedScreen from './OrderAcceptedScreen';
import ChatScreen from './ChatScreen';

import Icon from 'react-native-vector-icons/Feather';
import FavoritesScreen from './FavoritesScreen';
import HomeStack from './HomeStack';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const HomeDashboardNew = () => {
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'search';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Favourite') {
            iconName = 'heart';
          } else if (route.name === 'Account') {
            iconName = 'user';
          }
          else if (route.name === 'Chatbot') {
            iconName = 'message-square';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{ padding: 5 }}
            />
          );
        },
        tabBarActiveTintColor: '#53b175',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Cart" component={CartScreen} />
      {/* <Tab.Screen name="Favourite" component={FavoritesScreen} /> */}
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Chatbot" component={ChatScreen} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeDashboardNew;
