import {View, Text, TextInput} from 'react-native'

type InputPropsTypes = {
  inputName: string
  placeHolder?: string,
}

const Input: React.FC<InputPropsTypes> = ({ inputName, placeHolder = 'Enter Text' }) => {
  return (
     <View className="w-full gap-2">
        <Text className="text-white">{inputName}</Text>
        <TextInput
          className="border border-white w-full rounded-lg p-2"
          placeholder={placeHolder}
        />
      </View>
  );
}

export default Input;