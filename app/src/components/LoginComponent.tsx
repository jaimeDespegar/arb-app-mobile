import * as React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, Icon, Image  } from 'react-native';
import { TextInput, HelperText, useTheme, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';

const initialState = {
  text: '',
  flatTextSecureEntry: true,
};

type AvoidingViewProps = { children: React.ReactNode; };

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return ( <>{children}</> );
};

const LoginComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
    flatTextSecureEntry,
    flatTextPassword,
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
              label="Email"
              placeholder="Ingrese su email"
              value={text}
              error={text && !_isEmailValid(text)}
              onChangeText={text => inputActionHandler('text', text)}
              right={
                <TextInput.Icon
                  name={!_isEmailValid(text) ? '' : 'check'}
                  onPress={() =>
                    console.log('clickeo el input')
                  }
                  forceTextInputFocus={false}
                />
              }
            />
            {(text && !_isEmailValid(text)) ?
            <HelperText type="error" visible={text && !_isEmailValid(text)}>
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
            <TouchableOpacity>
                <Text style={styles.forgotMyPasswordText}>
                  ¿Olvidaste la contraseña?
                </Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Ingresar
          </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Crear Cuenta
          </Button>
        </View>
    </TextInputAvoidingView>
  );
};

LoginComponent.title = 'Login';

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
    margin: 4,
  },
  button: {
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
  forgotMyPasswordText: {
    color: 'rgb(98, 0, 238)', 
    marginLeft: 1,
    marginTop: 6, 
    marginBottom: 12
  }
});

export default LoginComponent;