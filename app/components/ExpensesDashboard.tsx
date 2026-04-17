import {View, Text ,ScrollView, Modal, Button, Platform, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './Title';
import Expense from './Expense';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/AntDesign';

type ExpensesDashboardTypeProps = {
  route: string
}

const ExpensesDashboard: React.FC<ExpensesDashboardTypeProps> = ({ route }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedExpenseId, setSelectedExpenseId] = useState('')
  const queryClient = useQueryClient

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

  const { data: fetchedExpenses, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses
  })

  const handlePress = (id: string) => {
    setShowModal(true)
    setSelectedExpenseId(id)
  }

  console.log(selectedExpenseId)

  const deleteExpense = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return;

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_EXPENSES_ENDPOINT}/${selectedExpenseId}?date_range_id=${dateRangeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) throw new Error('Error in your response for delete expense response')
    console.log(res)
    return await res.json()
  }


  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      setShowModal(false)
      refetch()

    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const handleDeleteBtn = () => {
    deleteMutation.mutate()
  }

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
        <ScrollView contentContainerClassName='gap-4'>
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
                onPress={() => {handlePress(expense.id)}}
              />
              )
            })
          }
        </ScrollView> 
        <Modal
          visible={showModal}
          animationType="slide"
          backdropColor={'#07277cff'}
          onRequestClose={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}
          presentationStyle='pageSheet'
        >
          <View className=" justify-center items-center py-8">
            {
              Platform.OS === 'ios' ? 
              <Button onPress={handleDeleteBtn} title="Delete">Delete</Button>
              :
              <Pressable onPress={handleDeleteBtn} className="bg-tertiary text-white max-w-[80px] rounded-md p-2 flex-row items-center gap-4 justify-center items-center">
                <Text className='text-[#ff0000]'>
                  Delete
                </Text>
                <View>
                  <Ionicons name='delete' size={24}  color={'#ff0000'} />
                </View>
              </Pressable>
            }
          </View>
        </Modal>
        </>
      }

    </SafeAreaView>
  );
}

export default ExpensesDashboard;