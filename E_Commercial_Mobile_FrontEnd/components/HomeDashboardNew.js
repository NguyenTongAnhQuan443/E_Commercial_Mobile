import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUp from './SignUp';
import Explore from './Explore';
import HomeScreen from './HomeScreen';
import ProductDetails from './ProductDetails';
import CartScreen from './CartScreen';
import ProductType from './ProductType';
import SearchScreen from './SearchScreen';
import Signin from './Signin';

import Icon from 'react-native-vector-icons/Feather';

const HomeDashboardNew = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // if(route.name == 'Home'){
          //     iconName = focused ? 'home' : 'home-outline';
          // }else if(route.name == 'Home1'){
          //     iconName = focused ? 'person-add' : 'person-add-alt-1';

          //     return <MaterialIcons name = {iconName} size={size} color={color}/>
          // }
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Signup') {
            iconName = 'user-plus';
          } else if (route.name === 'Explore') {
            iconName = 'search';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
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
      {/* <Tab.Screen name='Signin' component={Signin} /> */}
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Detail' component={ProductDetails} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Type' component={ProductType} />
      <Tab.Screen name='Search' component={SearchScreen} />


      <Tab.Screen name='Cart' component={CartScreen} />
      <Tab.Screen name='Signup' component={SignUp} />
    </Tab.Navigator>
  )
}

export default HomeDashboardNew

const styles = StyleSheet.create({})