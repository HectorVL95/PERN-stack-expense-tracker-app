import { Text, View } from 'react-native' 

type TitlePropsTypes = {
  titleText: string
 }

const Title: React.FC<TitlePropsTypes> = ({ titleText }) => {
  return (
    <View className="w-full justify-center items-center">
      <Text className="text-white text-center text-2xl font-bold">
        {titleText}
      </Text>
    </View>
  );
}

export default Title;