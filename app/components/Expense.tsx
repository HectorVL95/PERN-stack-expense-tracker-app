import { View, Text, Image } from 'react-native';

type ExpenseTypeProps ={
  name: string,
  amount: number,
  location: string,
  image: string,
  dateCreated: string,
  timeCreated: string
}

const Expense: React.FC<ExpenseTypeProps> = ({name, amount, location, image, dateCreated, timeCreated }) => {
  return (
    <View>
      <View>
        <Text>{name}</Text>
        <Text>{amount}</Text>
        <Text>{location}</Text>
        <Text></Text>
      </View>
      <View>
        <Image 
          src={image}
          
        />
      </View>
      <Text>Date: {dateCreated}</Text>
      <Text>Time: {timeCreated}</Text>
    </View>
  );
}

export default Expense;