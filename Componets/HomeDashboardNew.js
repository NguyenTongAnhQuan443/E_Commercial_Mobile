import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Login from './Login';
import SignUp from './SignUp'; 
import Explore from './Explore';
const HomeDashboardNew = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if(route.name == 'Home'){
                        iconName = focused ? 'home' : 'home-outline';
                    }else if(route.name == 'Home1'){
                        iconName = focused ? 'person-add' : 'person-add-alt-1';

                        return <MaterialIcons name = {iconName} size={size} color={color}/>
                    }
                }
            })}
        >
            <Tab.Screen name='Home' component={Explore} />
            <Tab.Screen name='Home1' component={SignUp}/>
        </Tab.Navigator>

        // <View></View>

        // <Login/>
    )
}

export default HomeDashboardNew

const styles = StyleSheet.create({})