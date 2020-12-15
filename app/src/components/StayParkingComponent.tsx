import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { useState, useEffect, useRef } from "react"; 
import { StyleSheet, View, Platform} from 'react-native';
import { Text, Portal, Dialog, Paragraph, Button, Colors } from 'react-native-paper';
import DialogCustom from './Dialogs/DialogCustom'
import DialogWithCustomColors from './Dialogs/DialogWithCustomColors'
import EntranceParkingComponent from './EntranceParkingComponent';
import EgressParkingComponent from './EgressParkingComponent';
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper';
import { getLabel } from './utils/LanguageHelper';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const StayParkingComponent = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notificationpush, setNotificationpush] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [labels, setLabels] = useState({});
  const [labelsEntrance, setLabelsEntrance] = useState({});
  const [labelsEgress, setLabelsEgress] = useState({});

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notificationpush => {
      setNotificationpush(notificationpush);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  
  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
  async function sendPushNotification(expoPushToken,tittlePush,bodyPush) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: tittlePush,
    body: bodyPush,
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const [entrance, setEntrance] = React.useState(true);
  const [pending, setPending] = React.useState(false);
  const [userNameLogin, setUserNameLogin] = useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [showMessageAlert, setShowMessageAlert] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visiblePending, setVisiblePending] = React.useState(false);
  const [message, setMessage] = useState({});
  const [messageAlert, setMessageAlert] = useState({});
  const [notification, setNotification] = useState({});
  const [dataPending, setDataPending] = useState({});

  const hideDialog = () => setShowMessage(false);
  const hideDialogAlert = () => setShowMessageAlert(false);

  const checkStay = () => {
    
    if (userNameLogin) {
      axios
      .get('estadia/status?userName='+userNameLogin)
      .then(response => {
        const status = response.data.status
        if (status === 'PENDING') {
          setPending(true);
          setDataPending(response.data);
        } else if (status === 'ENTRANCE_DONE') {
          setEntrance(false);
          setPending(false);
        } else {
          setPending(false);
          setEntrance(true);
        }
      })
      .catch(error => {
        console.debug('Error to find stay by user ', error);
      });
    } else {
      console.debug('El usuario no esta cargado en check stay');
    }
  }

  const checkSuspectedNotifications = () => {
    if (userNameLogin) {
      axios
      .get('notificationEgress-getUser/'+userNameLogin+'/')
      .then(response => {
        setNotification(response.data)
        setVisible(true);
        sendPushNotification(expoPushToken, labels.suspectCaseTitle, labels.suspectCaseBody);
      })
      .catch(error => {
        console.debug('Error no hay notificaciones sospechosas ', error);
        setNotification({})
      });
    } else {
      console.debug('El usuario no esta cargado checkSuspectedNotifications');
    }
  }

  const postResponseUser = () => {
    if (userNameLogin) {
      axios
      .post('estadia/pendings/response', {userName: userNameLogin})
      .then(response => {
        console.log('Response user OK ', response.data)
      })
      .catch(error => {
        console.debug('Error response user ', error);
      });
    } else {
      console.debug('El usuario no esta cargado postResponseUser');
    }
  }
  
  const checkPendingsStay = () => {
    if (userNameLogin) {
      axios
      .get('estadia/pendings?userName='+userNameLogin+'&isActive=False&notifyToUser=True')
      .then(response => {
        if (response.data.length) {
          setNotification(response.data[0]);
          setVisiblePending(true);
          sendPushNotification(expoPushToken, labels.pendingStayTitle, labels.pendingStayBody);
        } else {
          console.info('No hay datos pendientes')
        }
      })
      .catch(error => {
        console.log('Error buscando la respuesta de la estadia pendiente ', error);
        setNotification({})
      });
    } else {
      console.debug('El usuario no esta cargado checkSuspectedNotifications');
    }
  }

  const closeDialog = (isSuspected) => {
    setVisible(false);
    setEntrance(true);
    if (isSuspected) {
      setMessageAlert(labels.messageEgressForceSuspected)
    } else {
      setMessageAlert(labels.messageEgressForceOk)
    }
    setShowMessageAlert(true)
  }

  const closeDialogPending = () => {
    setVisiblePending(false);
    setEntrance(!notification.isAuthorize);
    setPending(false);
  }

  const successEntrance = () => {
    setMessage(labels.messageEntranceSuccess);
    setShowMessage(true);
    setEntrance(false);
  }

  const errorEntrance = () => {
    setMessage(labels.messageEntranceError);
    setShowMessage(true);
    setEntrance(true);
  }

  const successPending = (data) => {
    setMessage(labels.messagePendingOk);
    setDataPending(data);
    setShowMessage(true);
    setEntrance(false);
    setPending(true);
  }

  const errorPending = () => {
    setMessage(labels.messagePendingError);
    setShowMessage(true);
    setEntrance(true);
    setPending(false);
  }

  const successEgress = () => {
    setMessage(labels.messageEgressSuccess);
    setShowMessage(true);
    setEntrance(true);
  }

  const errorEgress = () => {
    setMessage(labels.messageEgressError);
    setShowMessage(true);
    setEntrance(false);
  }

  useEffect(() => {
    async function loadUserName() {
      await loadValue(USER_KEY, setUserNameLogin);
    }
    loadUserName();
    if (userNameLogin) {
      checkStay();
    } else {
      console.debug('El usuario no esta cargado en stay parking');
    }
    const interval = setInterval(() => {
      checkSuspectedNotifications();// crear notification push
      checkPendingsStay();// crear notification push
    }, 12000);
    return () => clearInterval(interval);
  }, [userNameLogin, entrance]);

  
  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.stayParking || {});
      setLabelsEntrance(data.entranceParking || {});
      setLabelsEgress(data.egressParking || {});
    }
    findLabels();
  }, [labels]);
  
  return (
    <>
      {
      (pending) ?
        (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={{fontSize: 17}}>{labels.titleStatusBike}</Text>
            <Text style={{fontSize: 16}}>{labels.parkingBike.replace('{0}', dataPending.parking).replace('{1}', dataPending.place)}</Text>
          </View>
        ) 
      : 
        ((entrance) ? 
          (
            <EntranceParkingComponent 
              success={successEntrance} 
              fail={errorEntrance}
              successPending={successPending}
              failPending={errorPending}
              userName={userNameLogin}
              labels={labelsEntrance}
            />
          )
          : 
          (
            <EgressParkingComponent 
              success={successEgress} 
              fail={errorEgress} 
              userName={userNameLogin} 
              place={0}
              labels={labelsEgress}
            />
        ))
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
      <Portal>
        <Dialog onDismiss={closeDialogPending} style={{ backgroundColor: Colors.purple900 }} visible={visiblePending} >
        <Dialog.Title style={{ color: Colors.white }}>{labels.statusStay}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ color: Colors.white }}>
              {notification.isAuthorize ? labels.approvedStay : labels.rejectedStay}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.white} onPress={()=>{postResponseUser();closeDialogPending()}}> 
              {labels.messageOk} 
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

StayParkingComponent.title = 'Stay Parking';
  
export default StayParkingComponent;
