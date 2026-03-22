import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <View className="w-full justify-center items-center">
        <Text className="text-white text-center text-2xl font-bold">
          PERN Stack Expense Tracker APP
        </Text>
      </View>
      <View className="w-full justify-center items-center gap-8">
        <View className="w-full gap-2">
          <Text className="text-white">Email</Text>
          <TextInput
            className="border border-white w-full rounded-lg p-2"
            placeholder="Enter Text"
          />
        </View>
        <View className="w-full gap-2">
          <Text className="text-white">Password</Text>
          <TextInput
            className="border border-white w-full rounded-lg p-2"
            placeholder="Enter Text"
          />
        </View>
        <View className="flex-col gap-8 w-full justify-center items-center">
          <Pressable className='rounded-lg bg-secondary py-2 w-full'>
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