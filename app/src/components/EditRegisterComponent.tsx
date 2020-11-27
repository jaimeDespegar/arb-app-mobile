import React, { useEffect , useState} from "react";
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom';
import { loadValue, USER_KEY } from './utils/StorageHelper';


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

  const [userNameLogin, setUserNameLogin] = useState("");
  
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
  
  const [titleDialog, setTitleDialog] = useState('')
  const [contentDialog, setContentDialog] = useState('')

  useEffect(() => {
    
    loadValue(USER_KEY, setUserNameLogin);

    if (userNameLogin) {
      axios
      .get('bikeOwner-getUser/' + userNameLogin + '/')
      .then((response) => response.data)
      .then((json) => {
        inputActionHandler('name', json.userName);
        inputActionHandler('email', json.email);
        inputActionHandler('confirmEmail', json.email);
        inputActionHandler('bicyclePhoto', json.bicyclePhoto);
        inputActionHandler('profilePhoto', json.profilePhoto);
      })
    .catch((error) => console.error('Error edition user: ', error))
    } else {
      console.debug("El usuario no esta cargado todavia")
    }
    
  }, [userNameLogin]);
  
  const userEdited = {
    name: name,
    email: email,
    password: flatTextPassword,
    bicyclePhoto: bicyclePhoto,
    profilePhoto: profilePhoto
  }

  const putData = () => {
    console.log("data to save ", userEdited)
    axios
      .put('bikeOwner/update/'+ userNameLogin +'/', userEdited)
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

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirmar edición",
      "¿Estás seguro?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => putData() }
      ],
      { cancelable: false }
    );

  return (
    <ScrollView>
        <View style={styles.inputs}>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Nombre de usuario"
              placeholder="Ingrese su nombre"
              value={name}
              disabled={true}
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
                    
          <Button mode="contained" onPress={() => createTwoButtonAlert()} style={styles.button}>
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