import {View, Text ,ScrollView, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './Title';
import Expense from './Expense';
import { useQuery } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store'
import { useState } from 'react';

type ExpensesDashboardTypeProps = {
  route: string
}

const ExpensesDashboard: React.FC<ExpensesDashboardTypeProps> = ({ route }: Props) => {
  const [showModal, setShowModal] = useState(false)

  const { dateRangeId } = route.params

  const fetchExpenses = async() => {
    const token = SecureStorage.getItem('token')
    if (!token) return;

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_EXPENSES_ENDPOINT}/${dateRangeId}`, {
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
        <>
        <ScrollView contentContainerClassName='flex-1 gap-4'>
          { 
            fetchedExpenses.map((expense: any) => {
              return (
              <Expense
                key={expense.id}
                name={expense.name}
                amount={expense.amount}
                location={expense.location}
                image={expense.image}
                dateCreated={expense.date_created}
                timeCreated={expense.hour_created}
              />
              )
            })
          }
        </ScrollView> 
        <Modal
          visible={showModal}
          className="bg-primary"
          animationType="slide"
          backdropColor={'#07277cff'}
          onRequestClose={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}
          presentationStyle='pageSheet'
        >
          <View>
            <Text>
              Modal Shown P
            </Text>
          </View>
        </Modal>
        </>
      }

    </SafeAreaView>
  );
}

export default ExpensesDashboard;