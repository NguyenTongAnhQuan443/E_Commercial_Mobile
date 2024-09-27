import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Login from './componets/Login';
import SignUp from './componets/SignUp';
import HomeDashboard from './componets/HomeDashboard';

export default function App() {
  return (
    // <Login/>
    <SignUp/>
    // <HomeDashboard/>
  );
}

const styles = StyleSheet.create({
});
