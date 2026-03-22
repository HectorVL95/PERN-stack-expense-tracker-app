import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from 'app/components/Input';
import Title from 'app/components/Title';

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <Title
        titleText="What's up P, please sign up so that you can check your expenses"
      />
      <View className="gap-4">
        <Input
          inputName="Name"
        />
        <Input
          inputName="Email"
        />
        <Input
          inputName="Password"
        />
        <Input
          inputName="Confirm Password"
        />
        <Pressable className="bg-secondary rounded-lg">
          <Text className="text-white text-center py-4">Create password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;