
import React, { useState, useEffect } from 'react';
import {  StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { saveValue, USER_KEY } from './utils/StorageHelper'
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import RegisterComponent from './RegisterComponent'
import { StylesInputs, StylesButton, StylesInputContainerStyle, StylesTitle, StylesForgotMyPasswordText} from './utils/StylesHelper';

const initialState = {
  flatTextSecureEntry: true,
  userName: ''
};

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
      console.log('Sign In Fail',error);
      showDialogError()
    });
}

const LoginComponent = () => {
  const navigation = useNavigation();
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const [labels, setLabels] = useState({});

  const {
    flatTextSecureEntry,
    password,
    userName
  } = state;

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
      setLabels(data.login || {});
    }
    findLabels();
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
        <View>
        <Text style={StylesTitle}>
          ¡Bienvenido a la UNGS, {userName}!
        </Text>
        </View>
        }
        </>
  );
};

LoginComponent.title = 'Login';

export default LoginComponent;
