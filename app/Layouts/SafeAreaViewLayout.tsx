import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type childrenProps = {
  children: ReactNode
}

const SafeAreaViewLayout: React.FC<childrenProps> = ({ children }) => {
  return (
    <SafeAreaView
      className="flex-1 bg-primary pt-4 px-8 gap-8"
    >
      {children}
    </SafeAreaView>
  );
}

export default SafeAreaViewLayout;