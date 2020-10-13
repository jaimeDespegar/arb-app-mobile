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
  
    return (
      <TextInputAvoidingView>
          <View style={styles.inputs}>
            <Text style={styles.hello}>
              ¡Buen viaje, Pepe!
            </Text>
            
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Retirar Bicicleta
            </Button>
          </View>
      </TextInputAvoidingView>
    );
  };
  
  EgressParkingComponent.title = 'Egress Parking';
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      alignItems: 'center'
    },
    hello: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      },
    inputs: {
      flex: 1,
      padding: 8,
      justifyContent: 'center'
    },
    wrapper: {
      flex: 1,
    },
    inputContainerStyle: {
      margin: 4,
    },
    button: {
      margin: 4,
      height: 50,
      justifyContent: 'center',
    },
    forgotMyPasswordText: {
      color: 'rgb(98, 0, 238)', 
      marginLeft: 1,
      marginTop: 6, 
      marginBottom: 12
    }
  });
  
  export default EgressParkingComponent;