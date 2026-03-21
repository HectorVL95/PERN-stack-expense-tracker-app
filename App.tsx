import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from 'app/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.screen 
          name='Login'
          component={Login}
          option={{ headerShown: false }}
        />

     
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
