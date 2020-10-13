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
  
  const availabilityParkingComponent = () => {
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
      
    const  bicicletero= '1';
    return (
      <TextInputAvoidingView>
          <View style={styles.inputs}>
            <Text style={styles.welcome}>
              ¡Disponibilidad en el bicicletero {bicicletero} !
            </Text>
            
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Refrescar
            </Button>
          </View>
      </TextInputAvoidingView>
    );
  };
  
  availabilityParkingComponent.title = 'Availability Parking';
  
  const styles = StyleSheet.create({
    inputs: {
      flex: 1,
      padding: 8,
      justifyContent: 'center'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 100,
      backgroundColor : 'green'
    },
    button: {
      margin: 4,
      height: 50,
      justifyContent: 'center',
    },
  });
  
  export default availabilityParkingComponent;