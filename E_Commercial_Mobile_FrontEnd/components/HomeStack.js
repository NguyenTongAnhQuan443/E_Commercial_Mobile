import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProductDetails from './ProductDetails';
import HomeScreenNew from './HomeScreenNew';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreenNew} options={{ headerShown: false }} /> */}
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
