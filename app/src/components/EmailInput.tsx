import * as React from 'react';
import {  StyleSheet, View, } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputReducer } from '../../utils';

const initialState = {
    email: '',
};

const EmailInput = () => {
    const [state, dispatch] = React.useReducer(inputReducer, initialState);
    
    const inputActionHandler = (type: string, payload: string) =>
        dispatch({
            type: type,
            payload: payload,
    });

    const {
        email,
    } = state;

    const formatEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isEmailValid = (name: string) => formatEmail.test(name);

    return (
        <View style={styles.inputContainerStyle}>
            <TextInput
              label="Email"
              placeholder="Ingrese su email"
              value={email}
              error={email && !isEmailValid(email)}
              onChangeText={email => inputActionHandler('email', email)}
              right={
                <TextInput.Icon
                  name={!isEmailValid(email) ? '' : 'check'}
                  onPress={() => {}}
                  forceTextInputFocus={false}
                />
              }
            />
            {(email && !isEmailValid(email)) ?
            <HelperText type="error" visible={email && !isEmailValid(email)}>
              Ingrese un email valido
            </HelperText>:<></>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainerStyle: {
      margin: 4,
      marginBottom: 0,
    },
});

export default EmailInput;