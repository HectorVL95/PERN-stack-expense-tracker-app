import { View } from "react-native";

type ExpenseTypeProps ={
  name: string,
  amount: number,
  location: string,
  image: string,
  dateCreated: string,
  hourCreated: string
}

const Expense: React.FC<ExpenseTypeProps> = ({name, amount, location, image, dateCreated, hourCreated }) => {
  return (
    <View>
      
    </View>
  );
}

export default Expense;