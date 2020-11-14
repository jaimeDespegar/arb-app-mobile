import * as React from 'react';
import { useState, useEffect } from "react"; 
import { StyleSheet, View } from 'react-native';
import DialogCustom from './Dialogs/DialogCustom'
import DialogWithCustomColors from './Dialogs/DialogWithCustomColors'
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper';
import EntranceParkingComponent from './EntranceParkingComponent';
import EgressParkingComponent from './EgressParkingComponent';
import { MessageEntranceSuccess, MessageEntranceError, MessageEgressForceSuspected,
         MessageEgressSuccess, MessageEgressError, MessageEgressForceOk } from './utils/MessagesHelper';


const StayParkingComponent = () => {
  
  const [entrance, setEntrance] = React.useState(true);
  const [userNameLogin, setUserNameLogin] = useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState({});
  const [messageAlert, setMessageAlert] = useState({});
  const [notification, setNotification] = useState(null);

  const hideDialog = () => setShowMessage(false);
  const hideDialogAlert = () => setShowMessageAlert(false);


  const checkStay = () => {
    
    if (userNameLogin) {
      axios
      .get('estadias?userName='+userNameLogin+'&isActive=true')
      .then(response => {
        console.log("Tiene una estadia registrada ", response.data);
        setEntrance(false);
      })
      .catch(error => {
        console.debug('Error to find stay by user ', error);
      });
    } else {
      console.debug('El usuario no esta cargado');
    }
 
  }

  const checkSuspectedNotifications = (user: string) => {
    console.log('user param ', userNameLogin)
    if (!userNameLogin) {
      loadValue(USER_KEY, setUserNameLogin);
    }
    if (userNameLogin) {
      axios
      .get('notificationEgress-getUser/'+userNameLogin+'/')
      .then(response => {
        setNotification(response.data)
        setVisible(true);
      })
      .catch(error => {
        console.debug('Error no hay notificaciones. ', error);
        setNotification(null)
      });
    } else {
      console.debug('El usuario no esta cargado checkSuspectedNotifications');
    }
 
  }

  const closeDialog = (isSuspected) => {
    setVisible(false);
    setEntrance(true);
    if (isSuspected) {
      setMessageAlert(MessageEgressForceSuspected)
    } else {
      setMessageAlert(MessageEgressForceOk)
    }
    setShowMessageAlert(true)
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

  useEffect(() => {
    
    const interval = setInterval(() => {
      console.log('¡Chequeo de notificaciones de alerta para el usuario!');
      checkSuspectedNotifications(userNameLogin);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
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
        <DialogCustom
          visible={showMessageAlert}
          title={messageAlert.title}
          content={messageAlert.content}
          messageAction={messageAlert.action}
          close={hideDialogAlert}
        />
      </View>

      <DialogWithCustomColors
        visible={visible}
        close={closeDialog}
        data={notification}
      />
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