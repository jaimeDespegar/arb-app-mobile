import {  StyleSheet, View, } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { inputReducer } from '../../utils';
import React, { useEffect , useState} from "react";

const initialState = {
    email: '',
};

const EmailInput = (props) => {
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
    //console.log(props.email)//imprime muchas veces el email!
    
    useEffect(() => {
      inputActionHandler('email', props.email) // hay 2 tipos de email!!
    }, []);
    return (
        <View style={styles.inputContainerStyle}>
            <TextInput
              label={props.label}
              placeholder={props.placeholder}
              value= {props.email}//{email}
              error={email && !isEmailValid(email)}
              onChangeText={email => props.onChangeText} //{inputActionHandler('email', email)}
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