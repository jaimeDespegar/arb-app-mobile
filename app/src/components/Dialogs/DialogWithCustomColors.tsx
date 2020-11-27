import React from "react";
import { Paragraph, Button, Portal, Dialog, Colors } from 'react-native-paper';
import axios from 'axios';


const notifyResponse = (values, isSuspected: Boolean, functionClose: Function) => {

  const userName = values.userName;

  const data = {
    userName: userName,
    isActive: false,
    isSuspected: isSuspected
  }

  axios
    .put('notificationEgress-update/'+userName+'/', data)
    .then(response => response.data)
    .then(data => {
      functionClose(isSuspected);
    })
    .catch(err => {
      console.error('Error al responder a la notificacion ',err)
    });
}

const DialogWithCustomColors = ({ visible, close, data} : {
                                  visible: boolean; close: () => void; data: Object}) => (
  <Portal>
    <Dialog onDismiss={close} style={{ backgroundColor: Colors.purple900 }} visible={visible} >
      <Dialog.Title style={{ color: Colors.white }}>¡Alerta de Posible Robo!</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={{ color: Colors.white }}>
          ¿Usted está retirando su bicicleta?
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button color={Colors.white} onPress={() => {notifyResponse(data, true, close)}}>
          No, avisar al guardia.
        </Button>
        <Button color={Colors.white} onPress={() => {notifyResponse(data, false, close)}}>
          Sí.
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default DialogWithCustomColors;