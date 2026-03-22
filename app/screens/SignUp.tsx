import { View, Text, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary pt-4 px-8 gap-8">
      <Text>What's up P, please sign up so that you can check your expenses</Text>
      <View>
        <View>
          <Text>Name</Text>
          <TextInput
            onChangeText={()  => {}}
            placeholder='Enter Text'
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            onChangeText={()  => {}}
            placeholder='Enter Text'
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            onChangeText={()  => {}}
            placeholder='Enter Text'
          />
        </View>
        <View>
          <Text>Confirm Password</Text>
          <TextInput
            onChangeText={()  => {}}
            placeholder='Enter Text'
          />
        </View>
        <Pressable>
          <Text>Create password</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;