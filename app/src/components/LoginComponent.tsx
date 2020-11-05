
import React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { saveValue, USER_KEY } from './utils/StorageHelper'


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
  
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
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
   

  return (
        <View style={styles.inputs}>        
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={'Nombre de usuario'}
              placeholder={'Ingrese su nombre de usuario'}
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
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Contraseña"
              placeholder="Ingrese su contraseña"
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
                <Text style={styles.forgotMyPasswordText}>
                  ¿Olvidaste la contraseña?
                </Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained"
                  onPress={() => handleRequest(userName, password, showDialogLogin, showDialog)}
                  style={styles.button}>
            Ingresar
          </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Crear Cuenta
          </Button>
      
          <View>
            <DialogCustom
              visible={visible}
              title='Error al iniciar sesion'
              content='Verifique los datos ingresados e intente nuevamente'
              messageAction='Ok'
              close={hideDialog}
            />
          </View>
          <View>
            <DialogCustom
              visible={showLogin}
              title='Login exitoso'
              content='Puede navegar correctamente '
              messageAction='OK'
              close={hideDialogLogin}
            />
          </View>
        </View>
  );
};

LoginComponent.title = 'Login';

const styles = StyleSheet.create({
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
  inputContainerStyle: {
    margin: 4,
    marginBottom: 0,
  },
  forgotMyPasswordText: {
    color: 'rgb(98, 0, 238)', 
    marginLeft: 1,
    marginTop: 6, 
    marginBottom: 12
  }
});

export default LoginComponent;