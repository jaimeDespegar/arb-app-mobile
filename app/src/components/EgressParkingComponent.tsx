import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { StylesInputs, StylesButton, StylesTitle} from './utils/StylesHelper';

const EgressParkingComponent = (props) => {

  const removeBicycle = (success: Function, fail: Function) => {
    
    const values = {
      'userName': props.userName,
      'place': props.place
    }

    axios
      .post('parking/egress/', values)
      .then(response => {
        success();
      })
      .catch(error => {
        console.log('Error in egress bike ', error);
        fail();
      });
  }

  return (
    <View style={StylesInputs}>
      <View>
        <Text style={StylesTitle}>
          {props.labels.bicycleParked.replace('{0}', props.userName)}
        </Text>
      
        <Button mode="contained" 
                onPress={() => removeBicycle(props.success, props.fail)} 
                style={StylesButton}>
          {props.labels.buttonRemoveBicycle}
        </Button>
      </View>
    </View>
  );
};

EgressParkingComponent.title = 'Egress Parking';

export default EgressParkingComponent;
