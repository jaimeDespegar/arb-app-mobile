import * as React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
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
  return (
    <View style={styles.inputs}>
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
      margin: 100
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
  }
});
  
export default EntranceParkingComponent;