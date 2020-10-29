//Vincularlo con la API (post-get-put)
//Validaciones
//Se deja para lo último 

import * as React from 'react';
import { useState } from "react"; ///(ComboBox) Picker
import {  StyleSheet, View, TouchableOpacity, Text, Picker  } from 'react-native';
import { useTheme, Button, } from 'react-native-paper';
import { inputReducer } from '../../utils';
import { DialogWithCustomColors } from './Dialogs';

const initialState = {
    text: '',
};

type ButtonVisibility = {
  [key: string]: boolean | undefined;
};

  
const EntranceParkingComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
  } = state;

  const { colors } = useTheme();

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
    const  userName= 'Pepe';
    const [visible, setVisible] = React.useState<ButtonVisibility>({});

  const _toggleDialog = (name: string) => () =>
    setVisible({ ...visible, [name]: !visible[name] });

  const _getVisible = (name: string) => !!visible[name];  
  
  //(ComboBox) Picker
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View style={styles.inputs}>
      <Text style={styles.goodBye}>
        Seleccione su estacionamiento:
      </Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      <Text style={styles.goodBye}>
        Bienvenido a la UNGS, {userName}!
      </Text>
      
      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Estacionar Bicicleta
      </Button>
      <Button mode="outlined" icon="alert" onPress={_toggleDialog('dialog5')} style={styles.button}>
        Alerta Robo
      </Button>
      <DialogWithCustomColors
        visible={_getVisible('dialog5')}
        close={_toggleDialog('dialog5')}
      />
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