import { View, Text, Image, Pressable, Modal } from 'react-native';
import { useState } from 'react';

type ExpenseTypeProps = {
  name: string,
  amount: number,
  location: string,
  image: string,
  dateCreated: string,
  timeCreated: string
  onPress: () => void
}

const Expense: React.FC<ExpenseTypeProps> = ({name, amount, location, image, dateCreated, timeCreated, onPress }) => {


  return (
    <Pressable onPress={onPress} className="border border-white rounded-xl p-4">
      <View>
        <Text className="text-white">{name}</Text>
        <Text className="text-white" >${amount}</Text>
        {location && <Text className="text-white" >{location}</Text>}
      </View>
     {
        image && 
        <View className='justify-center items-center py-4'>
          <Image 
            className='rounded-2xl'
            src={image}
            width={280}
            height={280}
          />
        </View>
      }
      <View>
        <Text className="text-white" >Date: {dateCreated}</Text>
        <Text className="text-white" >Time: {timeCreated}</Text>
      </View>
        {/* <Modal
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
        </Modal> */}
    </Pressable>
  );
}

export default Expense;