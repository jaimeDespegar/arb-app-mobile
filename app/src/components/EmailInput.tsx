import {  StyleSheet, View, } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputReducer } from '../../utils';
import React, { useEffect } from "react";

const initialState = {};

const EmailInput = (props) => {
    const [state, dispatch] = React.useReducer(inputReducer, initialState);
    
    // const inputActionHandler = (type: string, payload: string) =>
    //     dispatch({
    //         type: type,
    //         payload: payload,
    // });

    const formatEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isEmailValid = (name: string) => formatEmail.test(name);
    
    const email = props.value;
    
    return (
        <View style={styles.inputContainerStyle}>
            <TextInput
              label={props.label}
              placeholder={props.placeholder}
              value= {email}
              error={email && !isEmailValid(email)}
              onChangeText={e => { props.onChangeText(e) }}
              right={
                <TextInput.Icon
                  name={!isEmailValid(email) ? 'email' : 'check'}
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