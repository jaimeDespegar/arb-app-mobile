import * as React from 'react';
import { useState, useEffect } from "react"; 
import { StyleSheet, View, Text, Picker } from 'react-native';
import { Button, } from 'react-native-paper';
import { DialogWithCustomColors } from './Dialogs';
import DialogCustom from './Dialogs/DialogCustom'
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper'

  
const EntranceParkingComponent = () => {
  
  const [data, setData] = useState([]);  
  
  const [userNameLogin, setUserNameLogin] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [contentMessage, setContentMessage] = useState("");

  const [showMessage, setShowMessage] = React.useState(false);
  const showDialog = () => { setShowMessage(true) };
  const hideDialog = () => setShowMessage(false);

  const parkTheBike = () => {

    const values = {
      'userName': userNameLogin,
      'place': selectedValue
    }

    axios
      .post('parking/entrance/', values)
      .then(response => {
        setTitleMessage("Estacionamiento Exitoso")
        setContentMessage("Ahora puede ir a cursar seguro")
        showDialog();
      })
      .catch(error => {
        console.log('Error in entrace park ', error);
        setTitleMessage("Error al intentar estacionar")
        setContentMessage("Intente nuevamente mas tarde");
        showDialog();
      });
  }

  const [visible, setVisible] = React.useState(false);

  const _toggleDialog = (name: string) => () =>
    setVisible({ ...visible, [name]: !visible[name] });

  const _getVisible = (name: string) => !!visible[name];  
  
  const [selectedValue, setSelectedValue] = useState("1");

  useEffect(() => {
      
    loadValue(USER_KEY, setUserNameLogin);

    // axios
    //   .get('notificationEgress-getUser/' + userNameLogin + '/')
    //   .then((response) => response.data)
    //   .then((json) => setData(json))
    //   .catch((error) => console.error('Error Entrance', error));

    //   if(data.userName === userNameLogin){
    //     setVisible(true)
    //     console.log("tu bici esta en peligro!")
    //   }
    //   else{
    //     console.log("tu bici esta ok")
    //   }
  }, [userNameLogin]);
  
    return (
      <View style={styles.inputs}>
        
        <Text style={styles.goodBye}>
          Seleccione su estacionamiento:
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); console.log(itemValue)}}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
        <Text style={styles.goodBye}>
          Bienvenido a la UNGS, {userNameLogin}!
        </Text>
        
        <Button mode="contained" onPress={() => parkTheBike()} style={styles.button}>
          Estacionar Bicicleta
        </Button>
        <Button mode="outlined" icon="alert" onPress={_toggleDialog('dialog5')}  style={styles.stylesContainer}>
          Alerta Robo
        </Button>
        <DialogWithCustomColors
          visible={false}
          close={_toggleDialog('dialog5')}
          data={data}
        />
        <View>
          <DialogCustom
            visible={showMessage}
            title={titleMessage}
            content={contentMessage}
            messageAction='OK'
            close={hideDialog}
          />
        </View>
      </View>
    );
};

EntranceParkingComponent.title = 'Entrance Parking';

const styles = StyleSheet.create({
  goodBye: {
    fontSize: 20,
    textAlign: 'center',
      margin: 50
  },
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
});
  
export default EntranceParkingComponent;