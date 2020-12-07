import React from 'react';
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
          {props.labels.bicycleParked.replace('{0}', props.userName)}
        </Text>
      
        <Button mode="contained" 
                onPress={() => removeBicycle(props.success, props.fail)} 
                style={styles.button}>
          {props.labels.buttonRemoveBicycle}
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