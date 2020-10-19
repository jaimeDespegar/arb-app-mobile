import * as React from 'react';
import {  StyleSheet, View, Text,FlatList,ActivityIndicator  } from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect ,useState} from 'react';

const AvailabilityParkingComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const  bicicletero= 1;
  
  useEffect(() => {
    fetch('http://192.168.1.103:8000/api/bicycleParking-availability/')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  console.log(data) //es el print()

  const  message_availability= (data.freePlaces >= 1)? "Hay disponibilidad":"No hay mas lugar";
  const stylesContainer = {
    ...styles.inputs,//clonacion
    backgroundColor: (data.freePlaces >= 1)? '#82b74b':'red'
  };
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