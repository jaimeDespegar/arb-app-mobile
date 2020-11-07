import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';


const EgressParkingComponent = (props) => {

  const removeBicycle = (success: Function, fail: Function) => {
    
    const values = {
      'userName': props.userName,
      'place': props.place
    }

    axios
      .post('parking/egress/', values)
      .then(response => {
        console.log("Ok Egress, response ", response.data)
        success();
      })
      .catch(error => {
        console.log('Error in egress bike ', error);
        fail();
      });
  }

  return (
    <View style={styles.inputs}>
      <View>
        <Text style={styles.title}>
          ¡{props.userName} tu bicicleta esta estacionada!
        </Text>
      
        <Button mode="contained" 
                onPress={() => removeBicycle(props.success, props.fail)} 
                style={styles.button}>
          Retirar Bicicleta
        </Button>
      </View>
    </View>
  );
};

EgressParkingComponent.title = 'Egress Parking';

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
    marginTop:0 ,
    marginBottom: 50, 
  },
  button: {
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
});

export default EgressParkingComponent;