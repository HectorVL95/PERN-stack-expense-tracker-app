import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRange from 'app/components/DateRange';


const UserDashboard = () => {
  
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome Hector</Text>
        <Text>Your set budget is <Text>$300</Text></Text>
      </View>
      <View>
        <Text>Your date ranges</Text>
        <DateRange />
      </View>
    </SafeAreaView>
  );
}

export default UserDashboard;