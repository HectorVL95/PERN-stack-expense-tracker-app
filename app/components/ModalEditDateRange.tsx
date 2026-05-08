import ModalLayout from 'app/Layouts/ModalLayout';
import { Platform, View, Pressable, Text, Alert, TouchableOpacity } from 'react-native';
import { ModalCreateDateTypeProps } from 'app/types/modalTypes';
import { useMutation } from '@tanstack/react-query'
import * as SecureStorage from 'expo-secure-store'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react';
import Input from './Input';

const ModalEditDateRange: React.FC<ModalCreateDateTypeProps> = ({
  visibleModal, 
  hideModal, 
  refetch, 
  createDateRangeForm,
  setCreateDateRangeForm,
  budget,
  setBudget
}) => {

  const [showDatePicker, setShowDatePicker] = useState({
    fromDate: false,
    toDate: false
  })

  const [editRangeForm, setEditRangeForm] = useState({
    fromDate:'',
    toDate: ''
  })

  const editDateRange = async () => {
    const token = SecureStorage.getItem('token')
    if (!token) return;

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_DATE_RANGE_ENDPOINT}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: 
        from_date: editRangeForm.fromDate.split('T')[0],
        to_date: editRangeForm.toDate.split('T')[0],
        budget: Number(budget)
      })
    })
    if (!res.ok) throw new Error('Error response to create Date range')
    const data = await res.json()
    return data.data
  }

  const editDateRangeMutation = useMutation({
    mutationFn: editDateRange,
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
    editDateRangeMutation.mutate()
  }

  return (
  <ModalLayout 
    visible={visibleModal}
    onDismiss={hideModal}
    onRequestClose={hideModal}
    refetch={refetch}
  >
    <View className='gap-8'>
      <Pressable
        onPress={() => setShowDatePicker(prev => ({
          ...prev, fromDate: true
        }))}
      >
        <Input
          inputName="From Date"
          value={createDateRangeForm.fromDate.toString()}
          editable={false}
          pointerEvents='none'
        />
      </Pressable>
      <Pressable
        onPress={() => setShowDatePicker(prev => ({
          ...prev, toDate: true
        }))}
      >
        <Input
          inputName="To Date"
          value={createDateRangeForm.toDate.toString()}
          editable={false}
          pointerEvents='none'
        />
      </Pressable>
      <Input
        inputName='Budget'
        value={budget}
        setValue={(text) => {
          setBudget(text)
        }}
        keyboardType='numeric'
      />
      {
        (showDatePicker.fromDate && Platform.OS === 'ios') &&
        <View>
          <DateTimePicker
            mode='date'
            display='inline'
            value={createDateRangeForm.fromDate}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                setCreateDateRangeForm(prev => ({
                  ...prev, fromDate: selectedDate
                }))
              }
            }}
          />
          <View className="flex-row gap-4">
            <Pressable onPress={hideModal}>
              <Text className="text-white">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowDatePicker(prev => ({...prev, fromDate: false}))
              }}
            >
              <Text className="text-white">
                Accept
              </Text>
            </Pressable>
          </View>
        </View>
      }
      {
        (showDatePicker.fromDate && Platform.OS === 'android') && 
        <DateTimePicker
          mode='date'
          display='calendar'
          value={createDateRangeForm.fromDate}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setCreateDateRangeForm(prev => ({
                ...prev, fromDate: selectedDate
              }))
            }
            setShowDatePicker(prev => ({...prev, fromDate: false}))
          }}
        />
      }
      {
        (showDatePicker.toDate && Platform.OS === 'ios') &&
        <View>
          <DateTimePicker
            mode='date'
            display='inline'
            value={createDateRangeForm.toDate}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                setCreateDateRangeForm(prev => ({
                  ...prev, toDate: selectedDate
                }))
              }
            }}
          />
          <View className="flex-row gap-4 justify-center">
            <Pressable
                onPress={() => {
                   setShowDatePicker(prev => ({...prev, toDate: false}))
                   setCreateDateRangeForm(prev => ({...prev,
                    toDate: new Date()
                   }))
                }}
            >
              <Text className="text-white">
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={() => {
              setShowDatePicker(prev => ({...prev, toDate: false}))
            }}>
              <Text  className="text-white">
                Accept
              </Text>
            </Pressable>
          </View>
        </View>
      }
      {
        (showDatePicker.toDate && Platform.OS === 'android')&&
        <DateTimePicker
          mode='date'
          display='calendar'
          value={createDateRangeForm.toDate}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setCreateDateRangeForm(prev => ({
                ...prev, toDate: selectedDate
              }))
            }
            setShowDatePicker(prev => ({...prev, toDate: false}))
          }}
        />
      }
      <View className="justify-center flex-row gap-4 h-full w-full">
        <Pressable onPress={hideModal} className="h-[60px] justify-center items-center bg-tertiary p-4 rounded-lg ">
          <Text className="text-white">
            Cancel
          </Text>
        </Pressable>
        <Pressable className="items-center bg-tertiary p-4 rounded-lg h-[60px] justify-center"  onPress={handleAddBtn}>
          <Text className="text-white text-center">
            Create Date Range
          </Text>
        </Pressable>
      </View>
    </View>
  </ModalLayout>
  );
}

export default ModalEditDateRange;