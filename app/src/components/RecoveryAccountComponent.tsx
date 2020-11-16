import React, { useEffect , useState} from "react";
import {  StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import EmailInput from './EmailInput';
import { inputReducer } from '../../utils';
import { loadValue, USER_KEY } from './utils/StorageHelper';
import axios from 'axios';
import { StylesInputs, StylesButtonEditRecovery, StylesInputContainerStyle} from './utils/StylesHelper';

const initialState = {
  petJoined:'',
  streetJoined:'',
  movieJoined:'',
  userJoined:'',
};
const RecoveryAccountComponent = () => {
  const [userNameLogin, setUserNameLogin] = useState("");
  
  const [state, dispatch] = React.useReducer(inputReducer, initialState);

  const {
    petJoined,streetJoined,movieJoined,userJoined
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
  });
  const userRecovery = {
    name: userJoined,
    petJoined: petJoined,
    streetJoined: streetJoined,
    movieJoined: movieJoined
  }

  const recovery = () => {
    console.log("data to save ", userRecovery)
    // axios
    //   .put('bikeOwner/recovery/'+ userJoined +'/', userRecovery)
    //   .then(response => response.data)
    //   .then(data => {
    //   }) 
    //   .catch(err => {
    //     console.log('ERROR put ', err)
    //   })
  }


  return (
    <ScrollView>
        <View style={StylesInputs}>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label="Nombre de usuario"
              placeholder="Ingrese su nombre de usuario"
              value={userJoined}
              onChangeText={inputValue => inputActionHandler('userJoined', inputValue)}
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label="Nombre de mascota"
              placeholder="Ingrese el nombre de su mascota"
              value={petJoined}
              onChangeText={inputValue => inputActionHandler('petJoined', inputValue)}
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label="Nombre de su calle"
              placeholder="Ingrese el nombre de su calle"
              value={streetJoined}
              onChangeText={inputValue => inputActionHandler('streetJoined', inputValue)}
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label="Nombre de pelicula favorita"
              placeholder="Ingrese el nombre de su pelicula favorita"
              value={movieJoined}
              onChangeText={inputValue => inputActionHandler('movieJoined', inputValue)}
            />
          </View>
          <View style={StylesInputs}>
            
           <Button mode="contained" onPress={() => recovery()} style={StylesButtonEditRecovery}>
              Recuperar
            </Button>
        </View>
      </View>
    </ScrollView>   
  );
};
//<EmailInput  label="Email" placeholder="Ingrese su email" style={{marginBottom:12}}/>
RecoveryAccountComponent.title = 'Recovery Account';

export default RecoveryAccountComponent;