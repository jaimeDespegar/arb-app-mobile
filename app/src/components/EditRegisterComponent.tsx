import React, { useEffect , useState} from "react";
import {  StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import EmailInput from './EmailInput';
import axios from 'axios';
import DialogCustom from './Dialogs/DialogCustom';
import { loadValue, USER_KEY } from './utils/StorageHelper';
import { getLabel } from './utils/LanguageHelper';


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
  const [labels, setLabels] = useState({});
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
  
  const [titleDialog, setTitleDialog] = useState('');
  const [contentDialog, setContentDialog] = useState('');

  useEffect(() => {
    
    loadValue(USER_KEY, setUserNameLogin);
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.editRegister || {});
    }
    loadDataUser();
    findLabels();
  }, [userNameLogin, labels]);
  
  const loadDataUser = () => {
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
    .catch((error) => console.error('Error edition user: ', error)
    )
    } else {
      console.debug("El usuario no esta cargado todavia");      
    }
  }

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
        setTitleDialog(labels.successUpdateTitle)
        setContentDialog(labels.successUpdateContent)
      }) 
      .catch(err => {
        console.log('ERROR Edicion User ', err)
        setTitleDialog(labels.errorUpdateTitle)
        setContentDialog(labels.errorUpdateContent)
        if(err.response.status === 503){
          console.debug('El email ya existe');
          Alert.alert(labels.emailExists)
        }
      })
      showDialogEdition()
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      labels.alertTitle,
      labels.alertContent,
      [
        {
          text: labels.buttonCancel,
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
              label={labels.nameLabel}
              placeholder={labels.namePlaceholder}
              value={name}
              disabled={true}
              onChangeText={inputValue => inputActionHandler('name', inputValue)}
            />
          </View>

          <EmailInput label={labels.mailLabel} value={email} 
                      onChangeText={e => { inputActionHandler('email', e) }} 
                      placeholder={labels.mailPlaceholder}/>
          <EmailInput label={labels.confirmMailLabel} value={confirmEmail} 
                      onChangeText={e => { inputActionHandler('confirmEmail', e) }}  
                      placeholder={labels.confirmMailPlaceholder}/>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.passwordLabel}
              placeholder={labels.passwordPlaceholder}
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
              label={labels.bicycleLabel}
              placeholder={labels.bicyclePlaceholder}
              value={bicyclePhoto}
              onChangeText={inputValue => inputActionHandler('bicyclePhoto', inputValue)}
            />
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label={labels.profileLabel}
              placeholder={labels.profilePassword}
              value={profilePhoto}
              onChangeText={inputValue => inputActionHandler('profilePhoto', inputValue)}
            />
          </View>
                    
          <Button mode="contained" onPress={() => createTwoButtonAlert()} style={styles.button}>
            {labels.buttonSave}
          </Button>

          <Button mode="contained" onPress={() => {}} style={styles.button}>
            {labels.buttonCancel}
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