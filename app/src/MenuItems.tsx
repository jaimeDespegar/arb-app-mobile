import * as React from 'react';
import { View, StyleSheet, Platform, BackHandler } from 'react-native';
import {
  Drawer, Switch, TouchableRipple,
  Text, Colors, useTheme,
} from 'react-native-paper';
import axios from 'axios';
import DialogCustom from './components/Dialogs/DialogCustom'
import { removeValue, USER_KEY } from './components/utils/StorageHelper';
import { useNavigation } from '@react-navigation/native';

import { TextInput, Button } from 'react-native-paper';

type Props = {
  toggleTheme: () => void;
  toggleRTL: () => void;
  isRTL: boolean;
  isDarkTheme: boolean;
};

function logOut(showDialogLogout: Function) {

  if (axios.defaults.headers.common.Authorization) {
    axios
    .get('auth/logout/')
    .then(response => {
      axios.defaults.headers.common.Authorization = null;
      console.log('User logout! ', response.status, response.statusText);
      removeValue(USER_KEY);
      showDialogLogout();
    })
    .catch(error => console.log(error));
    
  } else {
    console.log('El usuario ya esta deslogueado.')
  }

}

const DrawerItemsData = [
  { label: 'Inicio', icon: 'home', key: 0 },
  { label: 'Estadia', icon: 'heart', colors: { colors:{primary: Colors.tealA200}}, key: 1 },
  { label: 'Mi Perfil', icon: 'send', colors: { colors:{primary: Colors.redA200}}, key: 3 },
];

const MenuItems = ({ toggleTheme, isDarkTheme }: Props) => {
  const navigation = useNavigation();

  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { colors } = useTheme();
  const [showLogout, setShowLogout] = React.useState(false);
  const showDialogLogout = () => setShowLogout(true);
  const hideDialogLogout = () => setShowLogout(false);
  
  return (
    <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
      {/* <Drawer.Section title="Menu">
        {DrawerItemsData.map((props, index) => (
          <Drawer.Item
            {...props}
            key={props.key}
            theme={props.colors}
            active={drawerItemIndex === index}
            onPress={() => _setDrawerItem(index)}
          />
        ))}
      </Drawer.Section>
      <Drawer.Section title="Preferencias">
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={isDarkTheme} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section> */}
      <Drawer.Section title="Gracias, vuelva pronto!">
        <TouchableRipple onPress={() => logOut(showDialogLogout)}>
          <View style={styles.preference}>
            <Text>Presione aquí para cerrar Session!</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      {/* <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.button}>
        Home
      </Button> */}
      <Button mode="outlined" onPress={() => BackHandler.exitApp()} style={styles.button}>
        Exit App!!!
      </Button>
      <View>
        <DialogCustom
          visible={showLogout}
          title='Logout exitoso'
          content='Cierre de sesion correcto'
          messageAction='OK'
          close={hideDialogLogout}
        />
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 22,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'red',
  },
  button: {
    margin: 20,
    height: 50,
    justifyContent: 'center',
  },
});

export default MenuItems;
