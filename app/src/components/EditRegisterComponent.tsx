import React, { useEffect , useState} from "react";
import {  StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'

const STORAGE_KEY = 'userName'

const initialState = {
  name: '',
  flatTextSecureEntry: true,
  email:'',
  confirmEmail:'',
  flatTextPassword:'',
  bicyclePhoto:'',
  profilePhoto:'',
};

const EditRegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name,email,confirmEmail, flatTextSecureEntry, flatTextPassword,bicyclePhoto,profilePhoto
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
  });

  const [showEditionOk, setShowEditionOk] = React.useState(false);

  const showDialogEdition = () => {
    setShowEditionOk(true)

    inputActionHandler('name', '')
    inputActionHandler('email', '')
    inputActionHandler('confirmEmail', '')
    inputActionHandler('flatTextPassword', '')
    inputActionHandler('bicyclePhoto', '')
    inputActionHandler('profilePhoto', '')    
  };

  const hideDialogEdition = () => setShowEditionOk(false);
  
    //CARGA DATOS EXISTENTES
  const [titleDialog, setTitleDialog] = useState('')
  const [contentDialog, setContentDialog] = useState('')
  //const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('bikeOwner-getUser/' + 'pepe' + '/')
      .then((response) => response.data)
      .then((json) => {
        inputActionHandler('name', json.userName);
        inputActionHandler('email', json.email);
        inputActionHandler('confirmEmail', json.email);
        //inputActionHandler('flatTextPassword', json.password);
        inputActionHandler('bicyclePhoto', json.bicyclePhoto);
        inputActionHandler('profilePhoto', json.profilePhoto);
    })
    .catch((error) => console.error('Error edition user: ', error))
  }, []);
  
  //CARGO LOS NUEVOS DATOS DEL INPUT EN UN JSON
  const someData = {
    name: name,
    email: email,
    password: flatTextPassword,
    bicyclePhoto: bicyclePhoto,
    profilePhoto: profilePhoto
  }

  const putData = () => {
    console.log("data to save ", someData)
    axios
      .put('bikeOwner/update/'+ 'pepe' +'/', someData)
      .then(response => response.data)
      .then(data => {
        setTitleDialog('Edicion exitosa')
        setContentDialog('Sus datos fueron actualizados correctamente')
      }) 
      .catch(err => {
        console.log('ERROR put ', err)
        setTitleDialog('Error en la edicion')
        setContentDialog('Verifique los datos ingresados')
      })
      showDialogEdition()
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
              onChangeText={inputValue => inputActionHandler('name', inputValue)}
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
                    
          <Button mode="contained" onPress={() => putData()} style={styles.button}>
            Guardar
          </Button>

          <Button mode="contained" onPress={() => {}} style={styles.button}>
          Cancelar
          </Button>
        
          <View>
            <DialogCustom
              visible={showEditionOk}
              title={titleDialog}
              content={contentDialog}
              messageAction='OK'
              close={hideDialogEdition}
            />
          </View>
        </View>
    </ScrollView>
  );
};

EditRegisterComponent.title = 'EditRegister';

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

export default EditRegisterComponent;