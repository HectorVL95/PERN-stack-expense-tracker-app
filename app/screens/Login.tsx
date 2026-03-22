import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from 'app/components/Input';
import Title from 'app/components/Title';

const Login = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <Title 
        titleText="PERN Stack Expense Tracker APP"
      />
      <View className="w-full justify-center items-center gap-8">
        <Input 
          inputName="Email"
        />
        <Input 
          inputName={'Password'}
        />
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