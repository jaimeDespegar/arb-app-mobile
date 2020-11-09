import * as React from 'react';
import { useState, useEffect } from "react"; 
import { StyleSheet, View, Text, Picker } from 'react-native';
import { Button, } from 'react-native-paper';
import axios from 'axios';


const EntranceParkingComponent = (props) => {
    
  const userNameLogin = props.userName;
  
  const parkTheBike = (success: Function, fail: Function) => {

    const values = {
      'userName': userNameLogin,
      'place': selectedValue
    }

    axios
      .post('parking/entrance/', values)
      .then(response => {
        success();
      })
      .catch(error => {
        console.log('Error in entrace park ', error);
        fail();
    });
  }

  const [selectedValue, setSelectedValue] = useState("1");

  
  return (
    <View style={styles.inputs}>
      
      <View>
        <Text style={styles.title}>
          ¡Bienvenido a la UNGS, {userNameLogin}!
        </Text>
        <Text style={styles.labelPlaces}>
            Seleccione su estacionamiento:
        </Text>
        
        <View style={styles.selectsPlaces}>  
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); console.log(itemValue)}}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        
        <Button mode="contained" onPress={() => parkTheBike(props.success, props.fail)} style={styles.button}>
          Estacionar Bicicleta
        </Button>
      </View>
      
    </View>
  );
};

EntranceParkingComponent.title = 'Entrance Parking';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
    marginTop:0,
  },
  labelPlaces: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
    marginTop:5,
    marginBottom: 15
  },
  selectsPlaces: { 
   
    alignItems: 'center', // Centered horizontally
    justifyContent: 'center',
    marginTop:10,
    marginBottom: 35
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