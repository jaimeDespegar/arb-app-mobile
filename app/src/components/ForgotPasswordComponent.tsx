import React, {useEffect} from 'react';
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom'
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [labels, setLabels] = React.useState({});
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

    axios
      .post('password_reset/', someData)
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

  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.forgotPassword || {});
    }
    findLabels();
  }, [labels]);

  return (
    <ScrollView>
        <View style={styles.inputs}>
          <EmailInput label={labels.mail} value={email} 
                      onChangeText={e => { inputActionHandler('email', e) }} 
                      placeholder={labels.mailPlaceholder}
                      messageInvalidMail={labels.messageInvalidMail}/> 
          <Button mode="contained" onPress={() => postData()} style={styles.button}>
            {labels.buttonRecovery}
            <Icon
                  name="envelope"
                  color="#000"
                  size={30}
            />
          </Button>
          <View>
            <DialogCustom
              visible={visible}
              title={labels.errorChangePasswordTitle}
              content={labels.errorChangePasswordContent}
              messageAction={labels.messageOk}
              close={hideDialog}
            />
          </View>
          <View>
              <DialogCustom
                visible={visibleForgot}
                title={labels.successChangePasswordTitle}
                content={labels.successChangePasswordContent}
                messageAction={labels.messageOk}
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
