import { View, Text, Image } from 'react-native';

type ExpenseTypeProps = {
  name: string,
  amount: number,
  location: string,
  image: string,
  dateCreated: string,
  timeCreated: string
}

const Expense: React.FC<ExpenseTypeProps> = ({name, amount, location, image, dateCreated, timeCreated }) => {
  return (
    <View className="border border-white rounded-xl  p-4">
      <View>
        <Text className="text-white">{name}</Text>
        <Text className="text-white" >${amount}</Text>
        <Text className="text-whit|||e" >{location}</Text>
        <Text className="text-white" ></Text>
      </View>
      <View>
        <Image 
          src={image}
          width={280}
          height={280}
        />
      </View>
      <Text className="text-white" >Date: {dateCreated}</Text>
      <Text className="text-white" >Time: {timeCreated}</Text>
    </View>
  );
}

export default Expense;