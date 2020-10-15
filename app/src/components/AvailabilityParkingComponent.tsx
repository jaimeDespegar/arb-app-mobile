import * as React from 'react';
import {  StyleSheet, View, Text  } from 'react-native';
import { Button } from 'react-native-paper';

const AvailabilityParkingComponent = () => {
 
  const  bicicletero= 1;
  const  message_availability= (bicicletero >= 1)? "Hay disponibilidad":"No hay mas lugar";

  const stylesContainer = {
    ...styles.inputs,//clonacion
    backgroundColor: (bicicletero >= 1)? '#82b74b':'red'
  };

  //console.log(stylesContainer) //es el print()
  return (
    <View style={stylesContainer}>
      <Text style={styles.welcome}>
        {message_availability}
      </Text>
        
      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Actualizar
      </Button>
    </View>
  );
};

AvailabilityParkingComponent.title = 'Availability Parking';



const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  button: {
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
  },
});

export default AvailabilityParkingComponent;