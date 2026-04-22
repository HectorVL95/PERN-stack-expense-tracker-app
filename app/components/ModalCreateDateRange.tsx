import ModalLayout from 'app/Layouts/ModalLayout';
import { TextInput, View, Pressable, Text, Alert } from 'react-native';
import { ModalCreateDateTypeProps } from 'app/types/modalTypes';
import { useMutation } from '@tanstack/react-query'
import * as SecureStorage from 'expo-secure-store'
import DatePicker from 'react-native-date-picker'

const ModalCreateDateRange: React.FC<ModalCreateDateTypeProps> = ({
  visibleModal, 
  hideModal, 
  refetch, 
  createDateRangeForm,
  setCreateDateRangeForm, 
}) => {

  const createDateRange = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return;

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_DATE_RANGE_ENDPOIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromDate: createDateRangeForm.fromDate,
        toDate: createDateRangeForm.toDate
      })
    })

    if (!res.ok) throw new Error('Error response to create Date range')

    const data = await res.json()
    return data.data
  }

  const createDateRangeMutation = useMutation({
    mutationFn: createDateRange,
    onSuccess: () => {
      refetch()
      hideModal()
    },
    onError: (error) => {
      Alert.alert('Date range not created')
      console.error(error.message)
    }
  })

  const handleAddBtn = () => {
    createDateRangeMutation.mutate()
  }

  return (
  <ModalLayout 
    visible={visibleModal}
    onDismiss={hideModal}
    onRequestClose={hideModal}
    refetch={refetch}
  >
    <View>
      <DatePicker
      />
      <DatePicker
      />
      <View className="justify-center flex-row gap-4 h-full w-full">
        <Pressable onPress={hideModal} className="h-[60px] justify-center items-center bg-tertiary p-4 rounded-lg ">
          <Text className="text-white">
            Cancel
          </Text>
        </Pressable>
        <Pressable className="items-center bg-tertiary p-4 rounded-lg h-[60px] justify-center"  onPress={handleAddBtn}>
          <Text className="text-white text-center">
            Add Expense
          </Text>
        </Pressable>
      </View>
    </View>
   
  </ModalLayout>
  );
}

export default ModalCreateDateRange;