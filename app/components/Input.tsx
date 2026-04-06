import {View, Text, TextInput} from 'react-native'

type InputPropsTypes = {
  inputName: string
  placeHolder?: string,
  value: string
  setValue: (text: string) => void
}

const Input: React.FC<InputPropsTypes> = ({ inputName, placeHolder = 'Enter Text', value, setValue }) => {
  return (
     <View className="w-full gap-2">
        <Text className="text-white">{inputName}</Text>
        <TextInput
          className="text-white border border-white w-full rounded-lg p-2"
          placeholder={placeHolder}
          value={value}
          onChangeText={setValue}
        />
      </View>
  );
}

export default Input;