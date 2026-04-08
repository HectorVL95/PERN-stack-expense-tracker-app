import {View, Text ,ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './Title';
import Expense from './Expense';
import { useQuery } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store'
import { BACKEND_SERVER, EXPENSES_ENDPOINT } from '@env';

type ExpensesDashboardTypeProps = {
  route: string
}

const ExpensesDashboard: React.FC<ExpensesDashboardTypeProps> = ({ route }: Props) => {

  const { dateRangeId } = route.params

  console.log(dateRangeId)

  const fetchExpenses = async() => {
    const token = SecureStorage.getItem('token')
    if (!token) return;

    const res = await fetch(`${BACKEND_SERVER}${EXPENSES_ENDPOINT}/${dateRangeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Error in your response to fetch expenses')
 
    const data = await res.json()
    return data.data
  }

  const { data: fetchedExpenses, isSuccess, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses
  })

  return (
    <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
      <Title
        titleText='Check your expenses P'

      />
      {
        isLoading &&
        <Text className="text-white">
          ... LOADING
        </Text>
      }
      { 
        isSuccess &&
        <ScrollView contentContainerClassName='gap-4'>
          { 
            fetchedExpenses.map((expense: any) => {
              return (
              <Expense 
                name={expense.name}
                amount={expense.amount}
                location={expense.location}
                image={expense.image}
                dateCreated={expense.date}
                timeCreated={expense.time}
              />
              )
            })
          }
        </ScrollView>  
      }

    </SafeAreaView>
  );
}

export default ExpensesDashboard;