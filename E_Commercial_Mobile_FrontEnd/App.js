import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeDashboardNew from './components/HomeDashboardNew';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './reduxToolkit/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeDashboardNew />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
