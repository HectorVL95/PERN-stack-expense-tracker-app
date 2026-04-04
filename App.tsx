import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from 'app/screens/Login';
import SignUp from 'app/screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import UserDashboard from 'app/screens/UserDashboard';
import { useAuth } from 'app/hooks/useAuth';

export default function App() {
  const Stack = createNativeStackNavigator()
  const { authorized } = useAuth()

  return (
    <SafeAreaProvider>
      {
        authorized  ?
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name='User Dashboard'
              component={UserDashboard}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        :
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name='Sign up'
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      }
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}