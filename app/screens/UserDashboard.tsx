import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRange from 'app/components/DateRange';
import Title from 'app/components/Title';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_SERVER, DATE_RANGE_ENDPOINT, USERS_ENDPOINT } from '@env';
import * as SecureStorage from 'expo-secure-store'


const UserDashboard = () => {

  const fetchDateRanges = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return
    const res = await fetch(`${BACKEND_SERVER}${DATE_RANGE_ENDPOINT}`, {
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
    const res = await fetch(`${BACKEND_SERVER}${USERS_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Error in your response to fetch user info')
    const data = await res.json()
    return data.data
  }

  const { data: fetchedDates } = useQuery({
    queryKey: ['dates'],
    queryFn: fetchDateRanges,
  })

  const { data: fetchedUser } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  })

  const seeExpenseDetails = () => {
    
  }

  return (
    <SafeAreaView className="bg-primary flex-1 pt-4 px-8 gap-8">
      <View className="gap-2">
        <Title 
          titleText={`Welcome ${fetchedUser.name}`}
        />
        <Text className="text-white text-center">Your set budget is <Text>${fetchedUser.budget}</Text></Text>
      </View>
      <ScrollView contentContainerClassName="flex flex-col gap-4">
        <Text className="text-white">Your date ranges</Text>
        {
          fetchedDates.map((date: any) => {
            return(
              <DateRange 
                key={date.id}
                fromDate={String(date.from_date)}
                toDate={String(date.to_date)}
                budget={String(date.budget)}
                expense={String(date.total_expenses)}
                seeExpense={() => {}}
            />
          )})
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserDashboard;