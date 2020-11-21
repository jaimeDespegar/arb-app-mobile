import * as React from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useEffect ,useState} from 'react';
import axios from 'axios';


const AvailabilityParkingComponent = () => {

  const [data, setData] = useState([]);
  
  const checkAvailability = () => {
    axios
      .get('bicycleParking-availability/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error))
  }
  
  useEffect(() => {
    checkAvailability();
  }, []);
  
  const stylesContainer = {
    ...styles.inputs,
  };

  const getColor = (parking) => (parking.freePlaces >= 1)? '#82b74b':'red';
  const buildTitleItem = (parking) => {
    return parking.freePlaces < 1 ? 'Sin disponibilidad' : 
    (parking.freePlaces === 1 ? "Hay " +parking.freePlaces +" lugar libre": "Hay " + parking.freePlaces +" lugares libres")
  }

  return (
    <View style={stylesContainer}>
      <List.Section title="Disponibilidad de Bicicleteros" style={{paddingLeft: 5, paddingRight: 3}}>
        {
          (data.length) ? (
            data.map((parking) => (
              <List.Accordion
                title={"Bicicltero N°"+parking.number}
                description={parking.description}
                style={{backgroundColor: getColor(parking), height: 65, width: '100%'}}
                left={props => <List.Icon {...props} icon="bike" />}>
                <List.Item title={buildTitleItem(parking)} 
                           style={{backgroundColor: getColor(parking) }} />
              </List.Accordion>
            ))
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text>No hay Bicicleteros registrados</Text>
            </View>
          )
        }
      </List.Section>


      <Button mode="contained" onPress={checkAvailability} style={styles.button}>
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
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AvailabilityParkingComponent;