import {View, Text, TextInput} from 'react-native'

type InputPropsTypes = {
  inputName: string
  placeHolder?: string,
  value: string
  setValue: (text: string) => void,
  keyboardType?: string
}

const Input: React.FC<InputPropsTypes> = ({ inputName, placeHolder = 'Enter Text', value, setValue, keyboardType = 'default' }) => {
  return (
     <View className="w-full gap-2">
        <Text className="text-white">{inputName}</Text>
        <TextInput
          className="text-white border border-white w-full rounded-lg p-2 py-3"
          placeholderTextColor={'#7a7a7a'}
          placeholder={placeHolder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={setValue}
        />
      </View>
  );
}

export default Input;