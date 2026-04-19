import Input from './Input';
import { Modal, View, Text, Pressable, Alert, Image, ActionSheetIOS, Platform } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ModalLayout from 'app/Layouts/ModalLayout';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/AntDesign'
import { useMutation } from '@tanstack/react-query';
import Title from './Title';
import * as SecureStorage from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'

type ModalCreateExpenseTypeProps = {
  visibleModal: boolean,
  hideModal: () => void,
  refetch: () => void,
  dateRangeId: string
}

const ModalCreateExpense: React.FC<ModalCreateExpenseTypeProps> = ({visibleModal, hideModal, refetch, dateRangeId}) => {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    location: '',
    image: ''
  })

  const [imageSelected, setImageSelected] = useState<string | null>(null)

    const createExpense = async () => {
      const token = SecureStorage.getItem('token')
      if (!token) return;
  
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_SERVER}${process.env.EXPO_PUBLIC_EXPENSES_ENDPOINT}/${dateRangeId}`, {
        headers: {
          method: 'POST',
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
  
      if (!res.ok) throw new Error('Error in your ')
      const data = await res.json()
      return data.data
    }

    const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const handleAddBtn = () => {
    createMutation.mutate()
  }

  const takePicture =  async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert('Permision to access camera must be granted')
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImageSelected(result.assets[0].uri)
    }
  }

  const pickImage = async () => {
    const permisionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permisionResult.granted) {
      Alert.alert('Permision to access image library must be granted')
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if(!result.canceled) {
      setImageSelected(result.assets[0].uri)
    }

  }

  const handlePictureBtn = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['cancel', 'Take photo', 'Choose from library'],
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          takePicture()
        } else if (buttonIndex === 2) {
          pickImage()
        }
      })
    } else {
      Alert.alert(
        'Select Imnage',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take photo', onPress: () => takePicture() },
          { text: 'Choose from library', onPress: () => pickImage() },
        ],
        {cancelable: true}
      )
    }
  }

  return (
    <ModalLayout
      visible={visibleModal}
      onDismiss={hideModal}
      onRequestClose={hideModal}
    >
      <Title
        titleText='Create your expense'
      />
      <Input
        inputName='Name'
        value={form.name}
        setValue={(text) => setForm({...form, name: text})}
      />
      <Input
        inputName='Amount'
        keyboardType='Numberic'
        value={form.amount}
        setValue={(text) => setForm({...form, amount: text})}
        
      />
      <Input
        inputName='Location'
        value={form.location}
        setValue={(text) => setForm({...form, location: text})}
      />
      <View className="justify-center items-center w-full">
        
      {     
        imageSelected ?
        <Pressable onPress={handlePictureBtn}>
          <Image
            width={200}
            height={200}
            src={imageSelected}
            className="rounded-lg"
            />
        </Pressable>
        : 
        <Pressable onPress={handlePictureBtn} className='bg-tertiary flex-row gap-4 rounded-lg items-center p-4 max-w-[160] justify-center'>
          <Text className='text-white'>
            Add picture
          </Text>
          <Ionicons name='camera' size={30} color={'#fff'}/>
        </Pressable>
      }
      </View>
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
    </ModalLayout>
  );
}

export default ModalCreateExpense;