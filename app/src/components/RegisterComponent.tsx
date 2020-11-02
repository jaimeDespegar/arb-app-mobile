import * as React from 'react';
import {  StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'

const initialState = {
  name: '',
  flatTextSecureEntry: true,
  email: '',
  confirmEmail: '',
  flatTextPassword:'',
  bicyclePhoto:'',
  profilePhoto:'',
};

const RegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name, flatTextSecureEntry, flatTextPassword, email, confirmEmail, bicyclePhoto, profilePhoto
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
  
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);  
  
  const postData = () => {
    
    const someData = {
      "bicyclePhoto": bicyclePhoto,
      "email": email,
      "password": flatTextPassword,
      "profilePhoto": profilePhoto,
      "username": name
    }
    
    console.log('user to post ', someData)

    const params = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json' // Indicates the content 
      },
      body: someData // We send data in JSON format
    }
    if (axios.defaults.headers.common.Authorization) {
      axios.defaults.headers.common.Authorization = null;
    }
    axios
      .post('auth/register/', params)
      .then(response => response.data)
      .then(data => {
        axios.defaults.headers.common.Authorization = `Token ${data.token}`;
        console.log('Registro OK: ', data)
      }) 
      .catch(err => {
        console.log(err)
        showDialog()
      })
  }

  return (
    <ScrollView>
        <View style={styles.inputs}>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Nombre"
              placeholder="Ingrese su nombre"
              value={name}
              onChangeText={name => inputActionHandler('name', name)}
            />
          </View>
          
          <EmailInput label="Email" value={email} onChangeText={e => { inputActionHandler('email', e) }} placeholder="Ingrese su email"/>
          <EmailInput label="Confirmar Email" value={confirmEmail} onChangeText={e => { inputActionHandler('confirmEmail', e) }}  placeholder="Ingrese su email nuevamente"/>

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
              label="Foto de la bicicleta"
              placeholder="Ingrese una foto de su bicicleta"
              value={bicyclePhoto}
              onChangeText={inputValue => inputActionHandler('bicyclePhoto', inputValue)}
            />
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Foto de perfil"
              placeholder="Ingrese su foto de perfil"
              value={profilePhoto}
              onChangeText={inputValue => inputActionHandler('profilePhoto', inputValue)}
            />
          </View>

          <Button mode="contained" onPress={() => postData()} style={styles.button}>
          Registar
          </Button>
          <View>
            <DialogCustom
              visible={visible}
              title='Error al Registrarse'
              content='Verifique los datos ingresados e intente nuevamente'
              messageAction='Ok'
              close={hideDialog}
            />
          </View>
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
