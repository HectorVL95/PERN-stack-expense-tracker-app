import { View, Text } from 'react-native';

type DateRangeTypesProps = {
  fromDate: string,
  toDate: string,
  budget: number,
  expense: number
}

const DateRange: React.FC<DateRangeTypesProps> = ({fromDate, toDate}) => {
  return (
    <View>
      <View>
        <Text className='text-white'>
          From: 03/14/2025
        </Text>
        <Text className='text-white'>
          To: 03/28/2025
        </Text>
      </View>
      <View>
        <Text className='text-white'>
          Budget: $300
        </Text>
        <Text className='text-white'>
          Expenses: $260
        </Text>
      </View>
    </View>
  );
}

export default DateRange;