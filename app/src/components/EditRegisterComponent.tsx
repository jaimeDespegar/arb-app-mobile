//nombre,mail y contraseña, foto
//hacer un get de la api y traer los datos de ahi
import React, { useEffect , useState} from "react";
import {  StyleSheet, View, Image, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import { ActivityIndicator, FlatList, Text} from 'react-native';
  

const initialState = {
  name: '',
  flatTextSecureEntry: true,
  email:'',
  email2:'',
  flatTextPassword:'',
  bicyclePhoto:'',
  profilePhoto:'',
};

const EditRegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name,email,email2, flatTextSecureEntry, flatTextPassword,bicyclePhoto,profilePhoto
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });


    //CARGA DATOS EXISTENTES
    const [isLoading, setLoading] = useState(true);
    //const [data, setData] = useState([]); //lista vacia
    const [data, setData] = useState({});//objeto vacio
    useEffect(() => {
      fetch('http://192.168.1.103:8000/api/bikeOwner-get/1/')
        .then((response) => response.json())
        .then((json) => {console.log(json); setData(json); inputActionHandler('name', json.name);
        inputActionHandler('email', json.email);inputActionHandler('flatTextPassword', json.password);
        inputActionHandler('bicyclePhoto', json.bicyclePhoto);inputActionHandler('profilePhoto', json.profilePhoto);
      })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    //CARGO LOS NUEVOS DATOS DEL INPUT EN UN JSON
    const someData = {
      name: name,
      email: email,
      password: flatTextPassword,
      bicyclePhoto: bicyclePhoto,
      profilePhoto: profilePhoto
     }
    body: JSON.stringify(someData) // We send data in JSON format

    const putMethod = {
      method: 'PUT',
      headers: {
       'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(someData) // We send data in JSON format
     }
     const putData = () => {
      fetch('http://192.168.1.103:8000/api/bikeOwner-update/1/', putMethod)
      .then(response => response.json())
      .then(data => console.log(someData)) 
     .catch(err => console.log(err))
     }
     
     //<EmailInput label="Email" email={email} onChangeText={ inputActionHandler('email', "text")} placeholder="Ingrese su email"/>
     //<EmailInput label="Confirmar Email" email={email2} onChangeText={ inputActionHandler('email2', "text2")} placeholder="Ingrese su email nuevamente"/>
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

          
          <EmailInput label="Email" email={email} onChangeText={inputValue =>  inputActionHandler('email', "text")} placeholder="Ingrese su email"/>
          <EmailInput label="Confirmar Email" email={data.email} placeholder="Ingrese su email nuevamente"/>

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
              
          <View style={styles.inputContainerStyle}>
            <Card.Cover source={require('../../assets/images/bici1.png')} />
            <Card.Cover source={require('../../assets/images/ciclista.png')} />
          </View>
          
          <Button mode="contained" onPress={() => putData()} style={styles.button}>
            Guardar
          </Button>

          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Cancelar
          </Button>
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