import React, { useState, useEffect } from 'react';
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveValue, USER_KEY } from './utils/StorageHelper';
import { StylesInputs, StylesInputContainerStyle, StylesButtonEditRegister} from './utils/StylesHelper';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

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
      .post('auth/register/', someData)
      .then(response => response.data)
      .then(data => {
        axios.defaults.headers.common.Authorization = `Token ${data.token}`;
        saveValue(USER_KEY, name);
        successRegister();
      }) 
      .catch(err => {
        console.log(err)
        if(err.response.status === 404){
          console.log('El usuario ya existe!');
          Alert.alert(labels.userExists)
        }
        if(err.response.status === 404){
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
        <View style={StylesInputs}>
          <View style={StylesInputContainerStyle}>
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

          <View style={StylesInputContainerStyle}>
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
          
          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.photoBicycle}
              placeholder={labels.bicyclePlaceholder}
              value={bicyclePhoto}
              onChangeText={inputValue => inputActionHandler('bicyclePhoto', inputValue)}
            />
          </View>

          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.profile}
              placeholder={labels.profilePlaceholder}
              value={profilePhoto}
              onChangeText={inputValue => inputActionHandler('profilePhoto', inputValue)}
            />
          </View>

          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.petName}
              placeholder={labels.petNamePlaceholder}
              value={pet}
              onChangeText={inputValue => inputActionHandler('pet', inputValue)}
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.streetName}
              placeholder={labels.streetNamePlaceholder}
              value={street}
              onChangeText={inputValue => inputActionHandler('street', inputValue)}
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.movieName}
              placeholder={labels.moviePlaceholder}
              value={movie}
              onChangeText={inputValue => inputActionHandler('movie', inputValue)}
            />
          </View>

          <Button mode="contained" onPress={() => postData()} style={StylesButtonEditRegister}>
            {labels.buttonRegister}
            <Icon
                  name="address-card"
                  color="#000"
                  size={30}
            />
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

export default RegisterComponent;
