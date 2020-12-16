
import React, { useState, useEffect } from 'react';
import {  View, TouchableOpacity, Text , Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { saveValue, removeValue, USER_KEY } from './utils/StorageHelper'
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StylesInputs, StylesButton, StylesInputContainerStyle, StylesTitle, StylesForgotMyPasswordText} from './utils/StylesHelper';


const initialState = {
  flatTextSecureEntry: true,
  userName: ''
};

function logOut(showDialogLogout: Function) {

  if (axios.defaults.headers.common.Authorization) {
    axios
    .get('auth/logout/')
    .then(response => {
      axios.defaults.headers.common.Authorization = null;
      console.log('User logout! ', response.status, response.statusText);
      removeValue(USER_KEY);
      showDialogLogout();
      console.info('Usuario deslogueado');
    })
    .catch(error => console.log(error));
  } else {
    axios.defaults.headers.common.Authorization = null;
    console.warn('El usuario ya esta deslogueado.')
  }
}

function handleRequest(userName: string, password: string, showDialogOk: Function, showDialogError: Function ) {

  const data = { 'username': userName, 'password': password } 
  
  if (axios.defaults.headers.common.Authorization) {
    axios.defaults.headers.common.Authorization = null;
  }

  axios
    .post('auth/login/', data)
    .then(response => {
      const { token, user } = response.data;
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      console.log('User logged: ', userName + ' - ' + token)
      saveValue(USER_KEY, userName);
      showDialogOk()
    })
    .catch(error => {
      console.log('Sign In Fail ', error.status, error.message, error);
      showDialogError()
    });
}



const LoginComponent = () => {
  const navigation = useNavigation();
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const [labels, setLabels] = useState({});
  const [showLogout, setShowLogout] = React.useState(false);
  const showDialogLogout = () => setShowLogout(true);
  const hideDialogLogout = () => setShowLogout(false);

  const {
    flatTextSecureEntry,
    password,
    userName
  } = state;

  const createTwoButtonAlert = () =>
    Alert.alert(
      labels.alertTitle,
      labels.alertDescription,
      [
        {
          text: labels.alertCancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => logOut(showDialogLogout) }
      ],
      { cancelable: false }
    );

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [showLogin, setShowLogin] = React.useState(false);
    const showDialogLogin = () => {
      inputActionHandler('userName', '')
      inputActionHandler('password', '')
      setShowLogin(true)
    };
    const hideDialogLogin = () => setShowLogin(false);
  
  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      const values = {...data.login, ...data.logout};
      setLabels(values);
    }
    labels && !labels.userLabel && findLabels();
  }, [labels]);
    
  return (
        <>
        { (!axios.defaults.headers.common.Authorization) ? 
        (
        <View style={StylesInputs}>        
          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.userLabel}
              placeholder={labels.userPlaceholder}
              value= {userName}
              onChangeText={(userName) => inputActionHandler('userName', userName)}
              right={
                <TextInput.Icon
                  name={!(userName) ? 'account' : 'check'}
                  onPress={() => {}}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
          <View style={StylesInputContainerStyle}>
            <TextInput
              label={labels.passwordLabel}
              placeholder={labels.passwordPlaceholder}
              value={password}
              onChangeText={(password) =>
                inputActionHandler('password', password)
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
            <TouchableOpacity>
                <Text style={StylesForgotMyPasswordText}>
                  {labels.forgotPassword}
                </Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained"
                  onPress={() => handleRequest(userName, password, showDialogLogin, showDialog)}
                  style={StylesButton}>
            {labels.buttonEnter}
            <Icon
                  name="key"
                  color="#000"
                  size={30}
            />
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('Mi perfil')} style={StylesButton}>
                        {labels.buttonCreateAccount}
            <Icon
                  name="address-card"
                  color="#000"
                  size={30}
            />
          </Button>
      
          <View>
            <DialogCustom
              visible={visible}
              title={labels.errorLoginTitle}
              content={labels.errorLoginContent}
              messageAction={labels.messageOk}
              close={hideDialog}
            />
          </View>
          <View>
            <DialogCustom
              visible={showLogin}
              title={labels.successLogin}
              content={labels.loginContent}
              messageAction={labels.messageOk}
              close={hideDialogLogin}
            />
          </View>
        </View>
        ) :
        <View style={StylesInputs}>
          <Text style={StylesTitle}>
            {labels.welcomeUser}
          </Text>
          <Button onPress={() => createTwoButtonAlert()} style={StylesButton}>
            {labels.closeSession}
          </Button>
          <View>
        <DialogCustom
          visible={showLogout}
          title={labels.successLogoutTitle}
          content={labels.successLogoutDetail}
          messageAction={labels.messageOk}
          close={hideDialogLogout}
        />
      </View>
        </View>
        }
        </>
  );
};

LoginComponent.title = 'Login';

export default LoginComponent;
