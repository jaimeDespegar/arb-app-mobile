import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { inputReducer } from '../../utils';

const MAX_LENGTH = 20;

const initialState = {
  text: '',
  maxLengthName: '',
};

type AvoidingViewProps = {
  children: React.ReactNode;
};

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

const LoginComponent = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
    flatTextSecureEntry,
    flatTextPassword,
  } = state;

  const formatEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const _isUsernameValid = (name: string) => formatEmail.test(name);

  const {
    colors: { background },
  } = useTheme();

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

  return (
    <TextInputAvoidingView>
      <ScrollView
        style={[styles.container, { backgroundColor: background }]}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >
        <View style={styles.inputContainerStyle}>
          <TextInput
            style={styles.inputContainerStyle}
            label="Email"
            placeholder="Ingrese su email"
            value={text}
            error={!_isUsernameValid(text)}
            onChangeText={text => inputActionHandler('text', text)}
          />
          <HelperText type="error" visible={!_isUsernameValid(text)}>
            Error: Ingrese un Email valido
          </HelperText>
        </View>

        <TextInput
          style={styles.inputContainerStyle}
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
      </ScrollView>
    </TextInputAvoidingView>
  );
};

LoginComponent.title = 'Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 24,
  },
  textArea: {
    height: 80,
  },
});

export default LoginComponent;
