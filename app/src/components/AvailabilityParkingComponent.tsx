import * as React from 'react';
import {  StyleSheet, View, Text  } from 'react-native';
import { Button } from 'react-native-paper';

const AvailabilityParkingComponent = () => {
 
  const  bicicletero= '1';

  return (
    <View style={styles.inputs}>
      <Text style={styles.welcome}>
        ¡Disponibilidad en el bicicletero {bicicletero} !
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

export default AvailabilityParkingComponent;