import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeDashboardNew from './components/HomeDashboardNew';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <HomeDashboardNew />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
