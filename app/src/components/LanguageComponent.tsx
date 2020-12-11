import React, { useState} from "react";
import { StyleSheet, View, Picker } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { saveValue, LANG_KEY } from './utils/StorageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';

const LanguageComponent = () => {

  const [language, setLanguage] = useState('es');
  const [labelButton, setLabelButton] = useState('Guardar');
  const [visible, setVisible] = useState(false);
  const [messageConfigSave, setMessageConfigSave] = useState('');

  const labelsButton = {
    es: { 
      button: 'Guardar',
      message: 'Configuracion guardada con éxito'
    },
    en: {
      button: 'Save',
      message: 'Configuration saved successfully'
    },
    pt: {
      button: 'Salve',
      message: 'Configuração salva com sucesso'
    }
  }

  const save = () => {
    saveValue(LANG_KEY, language);
    setVisible(true);
  }

  const onChangePicker = (lang: string)  => {
    setLanguage(lang);
    setLabelButton(labelsButton[lang].button);
    setMessageConfigSave(labelsButton[lang].message);
  }

  return (
    <View style={styles.inputs}>
      <View style={styles.inputs}>
        <Picker
          selectedValue={language} style={{ height: 60, width: 250}}
          onValueChange={(lang) => onChangePicker(lang)}
        >
          <Picker.Item key={"es"} label={"Español"} value={"es"} />
          <Picker.Item key={"en"} label={"English"} value={"en"} />
          <Picker.Item key={"pt"} label={"Portuguese"} value={"pt"} />
        </Picker>
        <Button mode="contained" onPress={() => save()} style={styles.button}>
          {labelButton}
          <Icon
                  name="language"
                  color="#000"
                  size={30}
            />
        </Button>
      </View>
      <View>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{ label: 'OK', onPress: () => {} }}>
          {messageConfigSave}
        </Snackbar>
      </View>
    </View>
  );
};

LanguageComponent.title = 'Language';

const styles = StyleSheet.create({
  inputContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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

export default LanguageComponent;