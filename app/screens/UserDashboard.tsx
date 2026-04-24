import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRange from 'app/components/DateRange';
import Title from 'app/components/Title';
import { useQuery } from '@tanstack/react-query';
import * as SecureStorage from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ModalCreateDateRange from 'app/components/ModalCreateDateRange';

const UserDashboard = () => {
  const navigation = useNavigation();
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createDateRangeForm, setCreateDateRangeForm] = useState({
    fromDate: new Date(),
    toDate: new Date()
  })
  const [budget, setBudget] = useState('')

  const fetchDateRanges = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_DATE_RANGE_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Error in your response to fetch data ranges')
    const data = await res.json()
    return data.data
  }

  const fetchUser = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_USERS_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!res.ok) throw new Error('Error in your response to fetch user info')
    const data = await res.json()
    return data.data
  }

  const { data: fetchedDates, isSuccess: successDates, isLoading: loadingDates, refetch } = useQuery({
    queryKey: ['dates'],
    queryFn: fetchDateRanges,
  })

  const { data: fetchedUser, isSuccess: successUser, isLoading: loadingUser, isError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  })

  const seeExpenseDetails = (dateRangeId: string) => {
    navigation.navigate('Expenses Dashboard', { dateRangeId } )
  }

  const handleAddDateRangeBtn = () => {
    setShowCreateModal(true)
  }

  const handleHideCreateDateRangeModal = () => {
    setShowCreateModal(false)
    setCreateDateRangeForm({
      fromDate: new Date(),
      toDate: new Date()
    })
    setBudget('')
  }

  if (loadingUser) {
    return (
      <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
        <View>
          <Text className='text-white'>
            ...Loading
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (successUser) {
    return (
      <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
        <View className="gap-2">
          <Title 
            titleText={`Welcome ${fetchedUser?.name}`}
          />
          <Text className="text-white text-center">Your set budget is <Text>${fetchedUser?.budget}</Text></Text>
        </View>
        <View className="justify-center items-center">
          <Pressable onPress={handleAddDateRangeBtn} className="bg-secondary rounded-lg p-4">
            <Text className="text-white text-center">
              Add Date Range
            </Text>
          </Pressable>
        </View>      
        <ScrollView contentContainerClassName="flex flex-col gap-4">
          <Text className="text-white">Your date ranges</Text>
          {
            fetchedDates?.map((date: any) => {
              return(
                <DateRange 
                  key={date?.id}
                  fromDate={String(date?.from_date)}
                  toDate={String(date?.to_date)}
                  budget={String(date?.budget)}
                  expense={String(date?.total_expenses)}
                  seeExpense={() => {seeExpenseDetails(date?.id)}}
                />
            )})
          }
        </ScrollView>
        <ModalCreateDateRange 
          visibleModal={showCreateModal}
          hideModal={handleHideCreateDateRangeModal}
          refetch={refetch}
          createDateRangeForm={createDateRangeForm}
          setCreateDateRangeForm={setCreateDateRangeForm}
          budget={budget}
          setBudget={setBudget}
        />
      </SafeAreaView>
    );
  }
}

export default UserDashboard;