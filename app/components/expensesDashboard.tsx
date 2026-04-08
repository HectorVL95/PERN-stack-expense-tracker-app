import {View, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './Title';
import Expense from './Expense';

const expensesDashboard = () => {
  const fetchExpenses = async () => {

  }

  return (
    <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
      <Title
        titleText='Check your expenses P'

      />      

    </SafeAreaView>
  );
}

export default expensesDashboard;