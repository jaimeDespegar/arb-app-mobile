import * as React from 'react';
import {  StyleSheet, View, } from 'react-native';
import { Button } from 'react-native-paper';
import EmailInput from './EmailInput';

const RecoveryAccountComponent = () => {
  return (
      <View style={styles.inputs}>
        <EmailInput  label="Email" placeholder="Ingrese su email" style={{marginBottom:12}}/>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Recuperar
        </Button>
      </View>
  );
};

RecoveryAccountComponent.title = 'Recovery Account';

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    padding: 8,
    justifyContent: 'center'
  },
  button: {
    margin: 4,
    marginTop: 8,
    height: 50,
    justifyContent: 'center',
  },
});

export default RecoveryAccountComponent;