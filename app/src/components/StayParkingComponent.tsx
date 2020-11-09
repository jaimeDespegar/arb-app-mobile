import * as React from 'react';
import { useState, useEffect } from "react"; 
import { StyleSheet, View } from 'react-native';
import DialogCustom from './Dialogs/DialogCustom'
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper';
import EntranceParkingComponent from './EntranceParkingComponent';
import EgressParkingComponent from './EgressParkingComponent';
import { MessageEntranceSuccess, MessageEntranceError, 
         MessageEgressSuccess, MessageEgressError } from './utils/MessagesHelper';


const StayParkingComponent = () => {
  
  const [entrance, setEntrance] = React.useState(true);
  const [userNameLogin, setUserNameLogin] = useState("");
  const [showMessage, setShowMessage] = React.useState(false);

  const [message, setMessage] = useState({});
  
  const hideDialog = () => setShowMessage(false);

  const checkStay = () => {
    
    if (userNameLogin) {
      axios
      .get('estadias?userName='+userNameLogin+'&isActive=true')
      .then(response => {
        console.log("Tiene una estadia registrada ", response.data);
        setEntrance(false);
      })
      .catch(error => {
        console.log('Error to find stay by user ', error);
      });
    } else {
      console.warn('El usuario no esta cargado');
    }
 
  }

  const successEntrance = () => {
    setMessage(MessageEntranceSuccess);
    setShowMessage(true);
    setEntrance(false);
  }

  const errorEntrance = () => {
    setMessage(MessageEntranceError);
    setShowMessage(true);
    setEntrance(true);
  }

  const successEgress = () => {
    setMessage(MessageEgressSuccess);
    setShowMessage(true);
    setEntrance(true);
  }

  const errorEgress = () => {
    setMessage(MessageEgressError);
    setShowMessage(true);
    setEntrance(false);
  }

  useEffect(() => {
    loadValue(USER_KEY, setUserNameLogin);
    checkStay();
  }, [userNameLogin, entrance]);
  
  return (
    <>
      {(entrance) ? 
        (
          <EntranceParkingComponent 
            success={successEntrance} 
            fail={errorEntrance} 
            userName={userNameLogin}
          />
        )
        : 
        (
          <EgressParkingComponent 
            success={successEgress} 
            fail={errorEgress} 
            userName={userNameLogin} 
            place={0}
          />
        )
      }

      <View>
        <DialogCustom
          visible={showMessage}
          title={message.title}
          content={message.content}
          messageAction={message.action}
          close={hideDialog}
        />
      </View>
      {/* <Button mode="outlined" icon="alert" onPress={_toggleDialog('dialog5')}  
                  style={styles.stylesContainer}>
          Alerta Robo
        </Button>
        <DialogWithCustomColors
          visible={false}
          close={_toggleDialog('dialog5')}
          data={data}
      /> */}
    </>
  );
};

StayParkingComponent.title = 'Stay Parking';

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
  
export default StayParkingComponent;