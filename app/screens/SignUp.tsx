import { View, Text, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'app/hooks/useAuth';

const SignUp = () => {
  const navigation = useNavigation()
  const { setAuthorized } = useAuth()
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    budget: ''
  })

  const createUser = async () => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_USERS_ENDPOINT}`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
        budget: signUpForm.budget
      })
    })
    if (!res.ok) throw new Error('Error in your reponse to create user')
    return await res.json()

  }

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      setAuthorized(true)
      await SecureStorage.setItemAsync('token', data.token)
      setSignUpForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        budget: ''
      })
      navigation.navigate('User Dashboard')
    },
    onError: (error) => {
      console.log(error.message)
      Alert.alert('not created', 'Unable to create')
    }
  })

  const handleCreateBtn = () => {
    if (signUpForm.password !== signUpForm.confirmPassword) {
      Alert.alert('Password and Confirm password do not match')
      return;
    }
    createMutation.mutate()
  }
  
  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <Title
        titleText="What's up P, please sign up so that you can check your expenses"
      />
      <View className="gap-4">
        <Input
          inputName="Name"
          value={signUpForm.name}
          setValue={(text) => {
            setSignUpForm({...signUpForm, name: text})
          }}
        />
        <Input
          inputName="Email"
          value={signUpForm.email}
          setValue={(text) => {
            setSignUpForm({...signUpForm, email: text})
          }}/>
        <Input
          inputName="Password"
          value={signUpForm.password}
          setValue={(text) => {
            setSignUpForm({...signUpForm, password: text})
          }}
        />
        <Input
          inputName="Confirm Password"
          value={signUpForm.confirmPassword}
          setValue={(text) => {
            setSignUpForm({...signUpForm, confirmPassword: text})
          }}
        />
        <Input
          inputName="Budget"
          value={signUpForm.budget}
          setValue={(text) => {
            setSignUpForm({...signUpForm, budget: text})
          }}
        />
        <Pressable onPress={handleCreateBtn} className="bg-secondary rounded-lg">
          <Text className="text-white text-center py-4">Create password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;