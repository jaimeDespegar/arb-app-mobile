import * as React from 'react';
import {  StyleSheet, View, } from 'react-native';
import { Button } from 'react-native-paper';
import EmailInput from './EmailInput';

type AvoidingViewProps = { children: React.ReactNode; };

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return ( <>{children}</> );
};

const RecoveryAccountComponent = () => {

  return (
    <TextInputAvoidingView>
        <View style={styles.inputs}>
          <EmailInput style={{marginBottom:4}}/>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Recuperar
          </Button>
        </View>
    </TextInputAvoidingView>
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
    marginTop: 0,
    height: 50,
    justifyContent: 'center',
  },
});

export default RecoveryAccountComponent;