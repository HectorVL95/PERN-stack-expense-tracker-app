import { StatusBar } from 'expo-status-bar';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from 'app/screens/Login';
import SignUp from 'app/screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import UserDashboard from 'app/screens/UserDashboard';
import { useAuth } from 'app/hooks/useAuth';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ExpensesDashboard from 'app/components/ExpensesDashboard';

export default function App() {
  const Stack = createNativeStackNavigator()
  const { authorized } = useAuth()
  const client = new QueryClient()

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        {
          authorized  ?
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen 
                  name='User Dashboard'
                  component={UserDashboard}
                  options={{headerShown: false}}
                />
                <Stack.Screen 
                  name='Expenses Dashboard'
                  component={ExpensesDashboard}
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
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}