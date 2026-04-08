import { View, Text, Pressable } from 'react-native';

type DateRangeTypesProps = {
  fromDate: string,
  toDate: string,
  budget: number,
  expense: number
  seeExpense: () => void 
}

const DateRange: React.FC<DateRangeTypesProps> = ({fromDate, toDate, budget, expense, seeExpense}) => {
  return (
    <Pressable onPress={seeExpense} className="flex-row  justify-between border border-white rounded-lg p-4">
      <View>
        <Text className='text-white'>
          From: {fromDate}
        </Text>
        <Text className='text-white'>
          To: {toDate}
        </Text>
      </View>
      <View>
        <Text className='text-white'>
          Budget: ${budget}
        </Text>
        <Text className='text-white'>
          Expenses: ${typeof null ? '0' : expense}
        </Text>
      </View>
    </Pressable>
  );
}

export default DateRange;