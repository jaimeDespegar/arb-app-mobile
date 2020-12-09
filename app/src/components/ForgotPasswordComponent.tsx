import * as React from 'react';
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'

const initialState = {
  email: '',
};

const ForgotPasswordComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
     email,
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });
  
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);  

  const [visibleForgot, setVisibleForgot] = React.useState(false);
  const showDialogForgot = () => setVisibleForgot(true);
  const hideDialogRegister = () => setVisibleForgot(false);  
  
  const successRegister = () => { 
    inputActionHandler('email', '');
    showDialogForgot();
  }

  const postData = () => {
    
    const someData = {
      "email": email,
    }
    
    console.log('user to post ', someData)
    const params = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json' // Indicates the content 
      },
      body: someData, // We send data in JSON format
      credentials: 'include'
    }


    axios
      .post('reset/password_reset/', someData)
      .then(response => response.data)
      .then(data => {
        axios.defaults.headers.common.Authorization = `Token ${data.token}`;
        console.log('Registro OK: ', data)
        successRegister()
      }) 
      .catch(err => {
        console.log(err)
        showDialog()
      })
  }

  return (
    <ScrollView>
        <View style={styles.inputs}>

          <EmailInput label="Email" value={email} onChangeText={e => { inputActionHandler('email', e) }} placeholder="Ingrese su email"/> 
          
          <Button mode="contained" onPress={() => postData()} style={styles.button}>
            Recuperar
          </Button>
          <View>
            <DialogCustom
              visible={visible}
              title='Error en recuperar contraseña'
              content='Verifique los datos ingresados e intente nuevamente'
              messageAction='Ok'
              close={hideDialog}
            />
          </View>
          <View>
              <DialogCustom
                visible={visibleForgot}
                title='Recupero de contraseña'
                content='¡ Email enviado !'
                messageAction='Ok'
                close={hideDialogRegister}
              />
            </View>
        </View>
    </ScrollView>
  );
};

ForgotPasswordComponent.title = 'Forgot Password';

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

export default ForgotPasswordComponent;