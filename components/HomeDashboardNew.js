import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import SignUp from './SignUp';
import Explore from './Explore';
import HomeScreen from './HomeScreen';
import ProductDetails from './ProductDetails';

import Icon from 'react-native-vector-icons/Feather';

const HomeDashboardNew = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
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
            <Tab.Screen name='Home' component={ProductDetails} />
            <Tab.Screen name='Explore' component={ProductDetails} />
            <Tab.Screen name='Signup' component={SignUp}/>
        </Tab.Navigator>
    )
}

export default HomeDashboardNew

const styles = StyleSheet.create({})