import * as React from 'react';
import { useState, useEffect } from "react"; 
import { StyleSheet, View, Text, Picker } from 'react-native';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import axios from 'axios';
import Modal from 'react-native-modal';

const EntranceParkingComponent = (props) => {
    
  const userNameLogin = props.userName;
  const [parkings, setParkings] = useState([])
  const [places, setPlaces] = useState([])
  const [availableSelectPlace, setAvailableSelectPlace] = React.useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [parkingSelected, setParkingSelected] = useState(1);
  const [placeSelected, setPlaceSelected] = useState(0);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const loadBicyclesParkings = () => {

    axios
      .get('bicycleParkingAndPlaces/')
      .then(response => {
        setParkings(response.data);
        console.log("parkings ", response.data)
      })
      .catch(error => {
        console.log('Error load parkings in entrance ', error);
        setParkings([]);
    });
  }

  const parkTheBike = (success: Function, fail: Function) => {

    const data = {
      'userName': userNameLogin,
      'parkingNumber': parkingSelected, 
      'place': placeSelected 
    }
 
    axios
      .post('parking/entrance/', data)
      .then(response => {
        success();
      })
      .catch(error => {
        console.log('Error in entrace park ', error);
        fail();
    });
  }

  const selectParking = (parkingNumber) => {
    const parking = parkings.find(p => p.number === parkingNumber) || {};
    setParkingSelected(parkingNumber);
    setPlaces(parking.places || []);
    setAvailableSelectPlace(false);
  }

  useEffect(() => {
    loadBicyclesParkings();
  },[]);

  return (
    <View style={styles.inputs}>
      <View>
        <Text style={styles.title}>
          ¡Bienvenido a la UNGS, {userNameLogin}!
        </Text>
        <View>
          <Text style={styles.labelPlaces}>
            Seleccione su estacionamiento:
          </Text>
          
          <View style={styles.selectsPlaces}>
            {
              (parkings.length) ? 
                <Picker
                  selectedValue={parkingSelected} style={{ height: 60, width: 250}}
                  onValueChange={(parkingNumber) => selectParking(parkingNumber)}
                >
                  {(parkings.map((parking) => (
                    <Picker.Item label={parking.description} value={parking.number} />
                  )))}
                </Picker>
              : 
                (<Text>Sin bicicleteros para seleccionar</Text>)
            }
          </View>
        </View>

       <View>
       <Text style={{textAlign: 'center'}}>{'Lugar seleccionado: ' + (placeSelected===0?'Sin seleccionar':placeSelected)}</Text>
        <Button disabled={availableSelectPlace} style={{...styles.button, marginTop: 30}} onPress={toggleModal}>
          Toque aqui para seleccionar su lugar
        </Button>
        </View>

        <View style={{flex: 1}}>
          <Modal isVisible={isModalVisible}>
            <View style={{flex: 1, height: '60%',  alignItems: 'center', flexDirection: 'row'}}>
              {
                (places.length) ? 
                  (places.map((place)=>(
                    <Surface style={{...styles.surface, backgroundColor: place.occupied ? 'green':'gray'}}>
                      <TouchableRipple
                        onPress={()=>{
                          if(place.occupied) {
                            toggleModal();
                            setPlaceSelected(place.placeNumber)
                          } else {
                            console.warn('No se registro una bicicleta en el lugar');
                          }
                        }}
                        rippleColor="rgba(0, 255, 0, .32)"
                      >
                        <Text>{place.placeNumber}</Text>
                      </TouchableRipple>
                    </Surface>
                  ))) 
                :
                  (<Text>No hay lugares</Text>)
              }
            </View>
            <Button style={{...styles.button, marginTop: 0}} onPress={toggleModal}>
              Elegir otro bicicletero
            </Button>
          </Modal>
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
  surface: {
    padding: 0,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 10,
    marginRight: 2
  },
  containerStyle: {
    backgroundColor: 'white', 
    height: '70%',
    width: '90%',
    padding: 20,
  }
});
  
export default EntranceParkingComponent;