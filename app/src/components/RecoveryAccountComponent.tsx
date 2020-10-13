import * as React from 'react';
import {  StyleSheet, View, TouchableOpacity, Text, Icon, Image  } from 'react-native';
import { TextInput, HelperText, useTheme, Button } from 'react-native-paper';
import { inputReducer } from '../../utils';

const initialState = {
  text: '',
};

type AvoidingViewProps = { children: React.ReactNode; };

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return ( <>{children}</> );
};

const RecoveryAccountComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
  } = state;

  const formatEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const _isEmailValid = (name: string) => formatEmail.test(name);

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
            <HelperText type="error" visible={text && !_isEmailValid(text)}>
              Ingrese un Email valido
            </HelperText>
          </View>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Recuperar
          </Button>
        </View>
    </TextInputAvoidingView>
  );
};

RecoveryAccountComponent.title = 'Recovery Account';

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
  inputContainerStyle: {
    margin: 4,
    marginBottom: 0,
  },
  button: {
    margin: 4,
    marginTop: 0,
    height: 50,
    justifyContent: 'center',
  },
});

export default RecoveryAccountComponent;