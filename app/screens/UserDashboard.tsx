import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRange from 'app/components/DateRange';
import Title from 'app/components/Title';


const UserDashboard = () => {
  
  return (
    <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
      <View className="gap-2">
        <Title 
          titleText='Welcome Hector'
        />
        <Text className="text-white text-center">Your set budget is <Text>$300</Text></Text>
      </View>
      <View>
        <Text className="text-white">Your date ranges</Text>
        <DateRange />
      </View>
    </SafeAreaView>
  );
}

export default UserDashboard;