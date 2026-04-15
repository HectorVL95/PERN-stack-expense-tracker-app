import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import { useAuth } from 'app/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import * as SecureStore from 'expo-secure-store'


const Login = () => {
  const navigation = useNavigation()
  const { authorized, setAuthorized } = useAuth()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const loginFn = async () => {
    const res = await fetch(`${process.env.BACKEND_SERVER}${process.env.USERS_ENDPOINT}/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      }
    )
    if (!res.ok) throw new Error('Error in your Login response')
    return await res.json()
  }

  const handleLoginBtn = () => {
    loginMutation.mutate()
  }

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async(data) => {
      setAuthorized(true)
      await SecureStore.setItemAsync('token', data.token)
      setLoginForm({
        email: '',
        password: ''
      })
      navigation.navigate('User Dashboard')
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <Title 
        titleText="PERN Stack Expense Tracker APP"
      />
      <View className="w-full justify-center items-center gap-8">
        <Input 
          inputName="Email"
          value={loginForm.email}
           setValue={(text) => setLoginForm({ ...loginForm, email: text })} 
        />
        
        <Input 
          inputName={'Password'}
          value={loginForm.password}
          setValue={(text) => setLoginForm({...loginForm, password: text})}
        />
        <View className="flex-col gap-8 w-full justify-center items-center">
          <Pressable onPress={handleLoginBtn
          } className='rounded-lg bg-secondary py-2 w-full'>
            <Text className="text-center text-white text-lg">Login</Text>
          </Pressable>
          <View className="gap-4 max-w-[120px]">
            <Text className="text-white">No account ? </Text>
            <Pressable 
              className="bg-secondary rounded-lg py-2"
              onPress={() => navigation.navigate('Sign up')}>
              <Text  className="text-white text-center text-lg">Sign Up</Text> 
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;