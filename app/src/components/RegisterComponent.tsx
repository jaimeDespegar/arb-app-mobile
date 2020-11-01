//le falta lo del email

import * as React from 'react';
import {  StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';

const initialState = {
  name: '',
  flatTextSecureEntry: true,
  email:'',
  flatTextPassword:'',
  bicyclePhoto:'',
  profilePhoto:'',
};

const RegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name, flatTextSecureEntry, flatTextPassword, email, bicyclePhoto, profilePhoto
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
  
  //POST
  //CARGO LOS NUEVOS DATOS DEL INPUT EN UN JSON
    const someData = {
      name: name,
      email: "emailVacio",
      password: flatTextPassword,
      bicyclePhoto: bicyclePhoto,
      profilePhoto: profilePhoto
     }
    //body: JSON.stringify(someData) // We send data in JSON format

    const postMethod = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(someData) // We send data in JSON format
     }
     const postData = () => {
      fetch('bikeOwner-create/', postMethod)
      .then(response => response.json())
      .then(data => console.log(someData)) 
     .catch(err => console.log(err))
     }

  return (
    <ScrollView>
        <View style={styles.inputs}>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Nombre"
              placeholder="Ingrese su nombre"
              value={name}
              // error={!name}
              onChangeText={name => inputActionHandler('name', name)}
            />
          </View>
          
          <EmailInput label="Email" email={email} onChangeText={inputValue =>  inputActionHandler('email', "text")} placeholder="Ingrese su email"/>
          <EmailInput label="Confirmar Email" placeholder="Ingrese su email nuevamente"/>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={flatTextPassword}
              onChangeText={(flatTextPassword) =>
                inputActionHandler('flatTextPassword', flatTextPassword)
              }
              secureTextEntry={flatTextSecureEntry}
              right={
                <TextInput.Icon
                  name={flatTextSecureEntry ? 'eye' : 'eye-off'}
                  onPress={() =>
                    dispatch({
                      type: 'flatTextSecureEntry',
                      payload: !flatTextSecureEntry,
                    })
                  }
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
          
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="bicyclePhoto"
              placeholder="Ingrese su bicyclePhoto"
              value={bicyclePhoto}
              onChangeText={inputValue => inputActionHandler('bicyclePhoto', inputValue)}
            />
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="foto de perfil"
              placeholder="Ingrese su foto de perfil"
              value={profilePhoto}
              onChangeText={inputValue => inputActionHandler('profilePhoto', inputValue)}
            />
          </View>


          <Button mode="contained" onPress={() => postData()} style={styles.button}>
            Registar
          </Button>
        </View>
    </ScrollView>
  );
};

RegisterComponent.title = 'Register';

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center'
  },
  button: {
    margin: 4,
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
  },
  inputContainerStyle: {
    margin: 4,
    marginBottom: 0,
  },
});

export default RegisterComponent;