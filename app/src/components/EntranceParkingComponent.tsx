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
  const [placeSelected, setPlaceSelected] = useState({});
  const [toleranceSeconds , setToleranceSeconds] = useState(60);
  const labels = props.labels;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }
  
  const loadBicyclesParkings = () => {

    axios
      .get('bicycleParkingAndPlaces/')
      .then(response => {
        setParkings(response.data);
      })
      .catch(error => {
        console.warn('Error load parkings in entrance ', error);
        setParkings([]);
    });
  }

  const loadConfiguration = () => {
    axios
      .get('configuration/secondsPending/')
      .then(response => {
        if (response.data && response.data.configurationValue) {
          setToleranceSeconds(response.data.configurationValue);
        } else {
          setToleranceSeconds(60); // default
        }
      })
      .catch(error => {
        console.log('Error load parkings in entrance ', error);
        setParkings([]);
    });
  }

  const checkParking = (props) => {
    const now = new Date().toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});
    const datePlace = new Date(placeSelected.dateAssociatedStay).toLocaleString("es-AR", {timeZone: "America/Argentina/Buenos_Aires"});
    const diffInSeconds = (new Date(now).getTime() - new Date(datePlace).getTime()) / 1000;

    if (diffInSeconds >= toleranceSeconds) {
      createParkingPending(props.successPending, props.failPending);
    } else {
      parkTheBike(props.success, props.fail);
    }
  }

  const parkTheBike = (success: Function, fail: Function) => {

    const data = {
      'userName': userNameLogin,
      'parkingNumber': parkingSelected, 
      'place': placeSelected.placeNumber 
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

  const createParkingPending = (success: Function, fail: Function) => {

    const data = {
      'userName': userNameLogin,
      'parkingNumber': parkingSelected, 
      'place': placeSelected.placeNumber 
    }
 
    axios
      .post('estadia/pendings/create/', data)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.log('Error in pending stay ', error);
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
    loadConfiguration();
  },[]);

  return (
    <View style={styles.inputs}>
      <View>
        <Text style={styles.title}>
          {(labels.welcomeUser||'').replace('{0}', userNameLogin)}
        </Text>
        <View>
          <Text style={styles.labelPlaces}>
            {labels.selectParking}
          </Text>
          
          <View style={styles.selectsPlaces}>
            {
              (parkings.length) ? 
                <Picker
                  selectedValue={parkingSelected} style={{ height: 60, width: 250}}
                  onValueChange={(parkingNumber) => selectParking(parkingNumber)}
                >
                  {(parkings.map((parking) => (
                    <Picker.Item key={parking.number} label={parking.description} value={parking.number} />
                  )))}
                </Picker>
              : 
                  (<Text>{labels.withOutParkingForSelect}</Text>)
            }
          </View>
        </View>

       <View>
        <Text style={{textAlign: 'center'}}>{labels.selectPlace +': ' + (placeSelected.placeNumber===0?labels.withOutSelect: placeSelected.placeNumber)}</Text>
        <Button disabled={availableSelectPlace} style={{...styles.button, marginTop: 30}} onPress={toggleModal}>
          {labels.touchForSelectPlace}
        </Button>
        </View>

        <View style={{flex: 1}}>
          <Modal isVisible={isModalVisible}>
            <View style={{flex: 1, height: '60%',  alignItems: 'center', flexDirection: 'row'}}>
              {
                (places.length) ? 
                  (places.map((place)=>(
                    <Surface key={parkingSelected+'_'+place.placeNumber} 
                             style={{...styles.surface, backgroundColor: place.occupied ? 'green':'gray'}}>
                      <TouchableRipple
                        onPress={()=>{
                          if(place.occupied) {
                            toggleModal();
                            setPlaceSelected(place);
                          } else {
                            console.warn(labels.placeNotRegistered);
                          }
                        }}
                        rippleColor="rgba(0, 255, 0, .32)"
                      >
                        <Text>{place.placeNumber}</Text>
                      </TouchableRipple>
                    </Surface>
                  ))) 
                :
                  (<Text>{labels.thereAreNotPlaces}</Text>)
              }
            </View>
            <Button style={{...styles.button, marginTop: 0}} onPress={toggleModal}>
              {labels.selectOtherParking}
            </Button>
          </Modal>
        </View>
        <Button mode="contained" onPress={() => checkParking(props)} style={styles.button}>
          {labels.buttonParkingBicycle}
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