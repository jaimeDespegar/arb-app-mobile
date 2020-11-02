import React from "react";
import { Paragraph, Button, Portal, Dialog } from 'react-native-paper';


const DialogCustom = ({ visible, title, content, messageAction, close }: {
  visible: boolean,
  title: string;
  content: string;
  messageAction: string;
  close: () => void;
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
          <Paragraph>{content}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
          <Button onPress={close}>{messageAction}</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default DialogCustom;