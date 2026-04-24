import { View, Text, TextInput, InputAccessoryView, Platform, Keyboard, Button } from 'react-native'

type InputPropsTypes = {
  inputName: string
  placeHolder?: string,
  value: string
  setValue?: (text: string) => void,
  keyboardType?: string
  editable?: boolean
  pointerEvents?: string
}

const Input: React.FC<InputPropsTypes> = ({ inputName, placeHolder = 'Enter Text', value, setValue, keyboardType = 'default', editable = true, pointerEvents = 'auto' }) => {

  const InputAccessoryViewID = 'numericDone';

  const isNumeric =
  keyboardType === 'numeric' ||
  keyboardType === 'number-pad' ||
  keyboardType === 'decimal-pad';

  return (
     <View className="w-full gap-2"
      pointerEvents={pointerEvents}
     >
        <Text className="text-white">{inputName}</Text>
        {
          Platform.OS === 'ios' &&
          <InputAccessoryView
            nativeID={InputAccessoryViewID}
          >
          <Button
            title="Done"
            onPress={() => Keyboard.dismiss()}
          />
          </InputAccessoryView>
        }
        <TextInput
          className="text-white border border-white w-full rounded-lg p-2 py-3"
          placeholderTextColor={'#7a7a7a'}
          placeholder={placeHolder}
          value={value}
          keyboardType={keyboardType}
          inputAccessoryViewID={Platform.OS === 'ios' && isNumeric ? InputAccessoryViewID : undefined}
          onChangeText={setValue ?? (() => {})}
          editable={editable}
        />
      </View>
  );
}

export default Input;