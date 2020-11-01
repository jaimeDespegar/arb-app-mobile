import React, { useEffect , useState} from "react";
import { Paragraph, Button, Portal, Dialog, Colors } from 'react-native-paper';
import { inputReducer } from '../../../utils';

const initialState = {
  isSuspected: ''
};

const putFunction = (data) => {
console.log("putFunction")

//CARGO LOS NUEVOS DATOS DEL INPUT EN UN JSON
const someData = {
  userName: data.userName,
  photoPath: data.photoPath,
  place: data.place,
  isOk: data.isOk,
  isSuspected: "True",//si presiona no es True
  estadia : data.estadia
 }
body: JSON.stringify(someData) 

const putMethod = {
  method: 'PUT',
  headers: {
   'Content-type': 'application/json; charset=UTF-8' 
  },
  body: JSON.stringify(someData) 
 }
 const putData = () => {
  fetch('http://192.168.1.108:8000/api/notificationEgress-update/13/', putMethod)
  .then(response => response.json())
  .then(data => console.log(someData)) 
 .catch(err => console.log(err))
 }
 putData()
}
//fetch('http://192.168.1.108:8000/api/notificationEgress-getUser/'+userName2+'/')//buscar userName
const DialogWithCustomColors = ({
  visible,
  close,
  data,
}: {
  visible: boolean;
  close: () => void;
  data: object;
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
          La bicicleta que estaciono en el campus esta siendo retirada, ¿Es usted?
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
      <Button color={Colors.white} onPress={() => putFunction(data)}>
          No, notificar al guardia
        </Button>
        <Button color={Colors.white} onPress={close}>
          Si, soy yo
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
//<Button color={Colors.white} onPress={() => putFunction()}>
//<Button color={Colors.white} onPress={close}> //funciona
export default DialogWithCustomColors;
