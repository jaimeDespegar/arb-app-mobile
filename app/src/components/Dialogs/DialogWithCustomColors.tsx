import * as React from 'react';
import { Paragraph, Button, Portal, Dialog, Colors } from 'react-native-paper';

const DialogWithCustomColors = ({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) => (
  <Portal>
    <Dialog
      onDismiss={close}
      style={{ backgroundColor: Colors.purple900 }}
      visible={visible}
    >
      <Dialog.Title style={{ color: Colors.white }}>¡Alerta Posible Robo!</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={{ color: Colors.white }}>
          La bicicleta que estaciono en el campues esta siendo retirada, ¿Es usted?
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button color={Colors.white} onPress={close}>
          No, notificar al guardia
        </Button>
        <Button color={Colors.white} onPress={close}>
          Si, soy yo
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default DialogWithCustomColors;
