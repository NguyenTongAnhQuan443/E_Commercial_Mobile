import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Login from './componets/Login';
import SignUp from './componets/SignUp';
import HomeDashboard from './componets/HomeDashboard';
import HomeDashboardNew from './componets/HomeDashboardNew';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    // <Login/>
    // <SignUp/>
    // <HomeDashboard/>

    <NavigationContainer>
      <HomeDashboardNew />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
