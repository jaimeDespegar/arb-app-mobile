import * as React from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect ,useState} from 'react';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

import { StylesInputs, StylesButton, StylesWelcome} from './utils/StylesHelper';

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
    ...StylesInputs, //clonacion//...styles.inputs, //clonacion
    backgroundColor: (data.freePlaces >= 1)? '#82b74b':'red'
  };

  return (
    <View style={stylesContainer}>
      <Text style={StylesWelcome}>
        {message_availability}
      </Text>
      <Button mode="contained" onPress={checkAvailability} style={StylesButton}>
        Actualizar
      </Button>
      {/* <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.button}>
            Home
      </Button> */}
    </View>
  );
};

AvailabilityParkingComponent.title = 'Availability Parking';


export default AvailabilityParkingComponent;