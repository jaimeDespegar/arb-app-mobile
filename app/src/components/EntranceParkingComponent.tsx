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
    return (
      <TextInputAvoidingView>
          <View style={styles.inputs}>
            <Text style={styles.goodBye}>
              Bienvenido a la UNGS, {userName}!
            </Text>
            
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Estacionar Bicicleta
            </Button>
          </View>
      </TextInputAvoidingView>
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