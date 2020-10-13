import * as React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text  } from 'react-native';
import { TextInput, HelperText, useTheme, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';
import ImagePicker from 'react-native-image-picker';

const initialState = {
  name: '',
  email: '',
  emailConfirm: '',
  flatTextSecureEntry: true,
};

type AvoidingViewProps = { children: React.ReactNode; };

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return ( <>{children}</> );
};


const RegisterComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name, email, emailConfirm, flatTextSecureEntry, flatTextPassword,
  } = state;

  const formatEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const _isEmailValid = (name: string) => formatEmail.test(name);
  const { colors } = useTheme();

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

  return (
    <TextInputAvoidingView>
        <View style={styles.inputs}>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Nombre"
              placeholder="Ingrese su nombre"
              value={name}
              error={!name}
              onChangeText={name => inputActionHandler('name', name)}
              right={
                <TextInput.Icon
                  name={!_isEmailValid(name) ? '' : 'check'}
                  onPress={() => {}}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Email"
              placeholder="Ingrese su email"
              value={email}
              error={email && !_isEmailValid(email)}
              onChangeText={email => inputActionHandler('email', email)}
              right={
                <TextInput.Icon
                  name={!_isEmailValid(email) ? '' : 'check'}
                  onPress={() =>
                    console.log('clickeo el input')
                  }
                  forceTextInputFocus={false}
                />
              }
            />
            {(email && !_isEmailValid(email)) ?
            <HelperText type="error" visible={email && !_isEmailValid(email)}>
              Ingrese un email valido
            </HelperText>:<></>}
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Confirmar Email"
              placeholder="Ingrese su email nuevamente"
              value={emailConfirm}
              error={emailConfirm && !_isEmailValid(emailConfirm)}
              onChangeText={emailConfirm => inputActionHandler('emailConfirm', emailConfirm)}
              right={
                <TextInput.Icon
                  name={!_isEmailValid(emailConfirm) ? '' : 'check'}
                  onPress={() =>
                    console.log('clickeo el input')
                  }
                  forceTextInputFocus={false}
                />
              }
            />
            {(emailConfirm && !_isEmailValid(emailConfirm)) ?
            <HelperText type="error" visible={emailConfirm && !_isEmailValid(emailConfirm)}>
              Ingrese un email valido
            </HelperText>:<></>}
          </View>

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
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Registar
          </Button>
        </View>
    </TextInputAvoidingView>
  );
};

RegisterComponent.title = 'Register';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center'
  },
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 4 
    // marginLeft: 4,
    // marginRight: 4,
  },
  button: {
    margin: 4,
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
  },

});

export default RegisterComponent;