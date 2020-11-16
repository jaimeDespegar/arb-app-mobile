import * as React from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect ,useState} from 'react';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

const AvailabilityParkingComponent = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  
  const checkAvailability = () => {
    axios
      .get('bicycleParking-availability/')
      .then((response) => response.data)
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }
  
  useEffect(() => {//192.168.1.108//javier
    checkAvailability();
  }, []);
  
  const  message_availability= (data.freePlaces >= 1)? "Hay disponibilidad":"No hay mas lugar";
  const stylesContainer = {
    ...styles.inputs, //clonacion
    backgroundColor: (data.freePlaces >= 1)? '#82b74b':'red'
  };

  return (
    <View style={stylesContainer}>
      <Text style={styles.welcome}>
        {message_availability}
      </Text>
      <Button mode="contained" onPress={checkAvailability} style={styles.button}>
        Actualizar
      </Button>
      {/* <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.button}>
            Home
      </Button> */}
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