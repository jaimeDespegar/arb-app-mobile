//Vincularlo con la API (post-get-put)
//Validaciones
//Se deja para lo último 

import * as React from 'react';
import { useState, useEffect } from "react"; 
import {  StyleSheet, View, Text, Picker  } from 'react-native';
import { useTheme, Button, } from 'react-native-paper';
import { inputReducer } from '../../utils';
import { DialogWithCustomColors } from './Dialogs';
import DialogCustom from './Dialogs/DialogCustom'
import axios from 'axios';

const initialState = {
    text: '',
    userName:'',
};

  
const EntranceParkingComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,userName,photoPath,place,isOk,isSuspected,estadia
  } = state;

  const { colors } = useTheme();

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
  const  userName2= 'Pepe';
  const [visible, setVisible] = React.useState(false);
  const [showErrorLocation, setShowErrorLocation] = React.useState(true);

  const _toggleDialog = (name: string) => () =>
    setVisible({ ...visible, [name]: !visible[name] });

  const _getVisible = (name: string) => !!visible[name];  
  
  //(ComboBox) Picker
  const [selectedValue, setSelectedValue] = useState("java");


  //Alerta
  const [data, setData] = useState([]);

  useEffect(() => {
    axios  
      .get('notificationEgress-get/43/')
      .then((response) => response.data)
      .then((json) => setData(json)) //es el print()
      .catch((error) => console.error('Error Entrance', error))

      if(data.userName === "userName"){
        setVisible(true)
        _getVisible('dialog5') 
        console.log("tu bici esta en peligro!")
      }
      else{
        console.log("tu bici esta ok")
      }

       
  }, []);
  
  const notificarAlerta = () => (data.userName == "userName")?  _toggleDialog('dialog5') : "OK"
  
  return (
    <View style={styles.inputs}>
      
      <Text style={styles.goodBye}>
        Seleccione su estacionamiento:
      </Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); console.log(itemValue)}}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
      </Picker>
      <Text style={styles.goodBye}>
        Bienvenido a la UNGS, {userName2}!
      </Text>
      
      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Estacionar Bicicleta
      </Button>
      <Button mode="outlined" icon="alert" onPress={_toggleDialog('dialog5')}  style={styles.stylesContainer}>
        Alerta Robo
      </Button>
      <DialogWithCustomColors
        visible={visible}
        close={_toggleDialog('dialog5')}
        data={data}
      />
      {/* <DialogCustom
              visible={showErrorLocation}
              title='Estacionamiento no permitido'
              content='Verifique que este cerca de un bicicletero'
              messageAction='Ok'
              close={()=>{setShowErrorLocation(false)}}
       /> */}
    </View>
  );
};

EntranceParkingComponent.title = 'Entrance Parking';

const styles = StyleSheet.create({
  goodBye: {
    fontSize: 20,
    textAlign: 'center',
      margin: 50
  },
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center'
  },
  button: {
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
});
  
export default EntranceParkingComponent;