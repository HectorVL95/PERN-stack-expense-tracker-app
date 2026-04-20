import { ReactNode, } from 'react';
import { Modal, ModalProps, View } from 'react-native';

type ModalLayoutTypeProps = {
  visible?: boolean,
  animationType?: ModalProps['animationType']
  backdropColor?: string, 
  onRequestClose?: () => void, 
  onDismiss?: () => void,
  presentationStyle?: ModalProps['presentationStyle'],
  children: ReactNode
}

const ModalLayout: React.FC<ModalLayoutTypeProps> = ({
  visible = false,
  animationType = 'slide',
  backdropColor='#07277cff',
  onRequestClose,
  onDismiss,
  presentationStyle = 'pageSheet', 
  children }) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      backdropColor={backdropColor}
      onRequestClose={onRequestClose}
      onDismiss={onDismiss}
      presentationStyle={presentationStyle}
      
    >
      <View className='flex-1 p-4 gap-4'>
        {children}
      </View>
    </Modal>
  );
}

export default ModalLayout;