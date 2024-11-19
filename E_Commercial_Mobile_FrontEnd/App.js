import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './reduxToolkit/store';

import Login from './components/Login';
import SignUp from './components/SignUp';
import HomeDashboardNew from './components/HomeDashboardNew';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={HomeDashboardNew} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
