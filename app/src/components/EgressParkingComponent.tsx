//Integrarlo con la API, primero se hace el del INGRESO

import * as React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { TextInput, HelperText, useTheme, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';

const initialState = {
    text: '',
  };
  
  type AvoidingViewProps = { children: React.ReactNode; };
  
  const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
    return ( <>{children}</> );
  };
  
  const EgressParkingComponent = () => {
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
    
    const retirarBici = () => {
      console.log("Retirar Bicicleta")
    }
    
    const  userName= 'Pepe';
    return (
      <TextInputAvoidingView>
          <View style={styles.inputs}>
            <Text style={styles.welcome}>
              ¡Buen viaje, {userName}!
            </Text>
            
            <Button mode="contained" onPress={() => retirarBici()} style={styles.button}>
              Retirar Bicicleta
            </Button>
          </View>
      </TextInputAvoidingView>
    );
  };
  
  EgressParkingComponent.title = 'Egress Parking';
  
  const styles = StyleSheet.create({
    inputs: {
      flex: 1,
      padding: 8,
      justifyContent: 'center'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 100
    },
    button: {
      margin: 4,
      height: 50,
      justifyContent: 'center',
    },
  });
  
  export default EgressParkingComponent;