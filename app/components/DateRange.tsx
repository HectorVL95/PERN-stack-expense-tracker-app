import { View, Text } from 'react-native';

const DateRange = () => {
  return (
    <View>
      <View>
        <Text>
          From: 03/14/2025
        </Text>
        <Text>
          To: 03/28/2025
        </Text>
      </View>
      <View>
        <Text>
          Budget: $300
        </Text>
        <Text>
          Expenses: $260
        </Text>
      </View>
    </View>
  );
}

export default DateRange;