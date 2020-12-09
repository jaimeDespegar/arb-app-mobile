import React, { useState, useEffect } from 'react';
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { getLabel } from './utils/LanguageHelper';


const initialState = {
  name: '',
  flatTextSecureEntry: true,
  email: '',
  confirmEmail: '',
  flatTextPassword:'',
  bicyclePhoto:'',
  profilePhoto:'',
  pet:'',
  street:'',
  movie:'',
};

const RegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name, flatTextSecureEntry, flatTextPassword, email, confirmEmail, 
    bicyclePhoto, profilePhoto, pet, street, movie
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
  
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);  
  const [labels, setLabels] = useState({});
  const [visibleRegister, setVisibleRegister] = React.useState(false);
  const showDialogRegister = () => setVisibleRegister(true);
  const hideDialogRegister = () => setVisibleRegister(false);  
  
  const successRegister = () => { 
    inputActionHandler('name', '');
    inputActionHandler('email', '');
    inputActionHandler('confirmEmail', '');
    inputActionHandler('flatTextPassword', '');
    inputActionHandler('bicyclePhoto', '');
    inputActionHandler('profilePhoto', '');
    inputActionHandler('pet', '');
    inputActionHandler('street', '');
    inputActionHandler('movie', '');
    showDialogRegister();
  }

  const postData = () => {
    
    const someData = {
      "bicyclePhoto": bicyclePhoto,
      "email": email,
      "password": flatTextPassword,
      "profilePhoto": profilePhoto,
      "username": name,
      "pet": pet,
      "street": street,
      "movie": movie,
    }
    
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
      .post('auth/register/')
      .then(response => response.data)
      .then(data => {
        axios.defaults.headers.common.Authorization = `Token ${data.token}`;
        successRegister()
      }) 
      .catch(err => {
        console.log(err)
        if(err.response.status === 501){
          console.log('El usuario ya existe!');
          Alert.alert(labels.userExists)
        }
        if(err.response.status === 503){
          console.log('El email ya existe!');
          Alert.alert(labels.mailExists)
        }
        showDialog()
      })
  }

  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.register || {});
    }
    findLabels();
  }, [labels]);

  return (
    <ScrollView>
        <View style={styles.inputs}>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.nameText}
              placeholder={labels.namePlaceholder}
              value={name}
              onChangeText={name => inputActionHandler('name', name)}
            />
          </View>
          
          <EmailInput label={labels.mail} value={email} 
                      onChangeText={e => { inputActionHandler('email', e) }} 
                      placeholder={labels.mailPlaceholder}
                      messageInvalidMail={labels.messageInvalidMail}/>
          <EmailInput label={labels.confirmMail} value={confirmEmail} 
                      onChangeText={e => { inputActionHandler('confirmEmail', e) }}
                      placeholder={labels.confirmMailPlaceholder}
                      messageInvalidMail={labels.messageInvalidMail}/>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.passwordLabel}
              placeholder={labels.passwordPlaceholder}
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
              label={labels.photoBicycle}
              placeholder={labels.bicyclePlaceholder}
              value={bicyclePhoto}
              onChangeText={inputValue => inputActionHandler('bicyclePhoto', inputValue)}
            />
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.profile}
              placeholder={labels.profilePlaceholder}
              value={profilePhoto}
              onChangeText={inputValue => inputActionHandler('profilePhoto', inputValue)}
            />
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.petName}
              placeholder={labels.petNamePlaceholder}
              value={pet}
              onChangeText={inputValue => inputActionHandler('pet', inputValue)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.streetName}
              placeholder={labels.streetNamePlaceholder}
              value={street}
              onChangeText={inputValue => inputActionHandler('street', inputValue)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.movieName}
              placeholder={labels.moviePlaceholder}
              value={movie}
              onChangeText={inputValue => inputActionHandler('movie', inputValue)}
            />
          </View>

          <Button mode="contained" onPress={() => postData()} style={styles.button}>
            {labels.buttonRegister}
          </Button>
          <View>
            <DialogCustom
              visible={visible}
              title={labels.errorRegister}
              content={labels.errorRegisterContent}
              messageAction={labels.messageOk}
              close={hideDialog}
            />
          </View>
          <View>
              <DialogCustom
                visible={visibleRegister}
                title={labels.successRegister}
                content={labels.welcome}
                messageAction={labels.messageOk}
                close={hideDialogRegister}
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