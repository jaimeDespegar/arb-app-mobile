import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Drawer, Switch, TouchableRipple,
  Text, Colors, useTheme,
} from 'react-native-paper';
import axios from 'axios';

type Props = {
  toggleTheme: () => void;
  toggleRTL: () => void;
  isRTL: boolean;
  isDarkTheme: boolean;
};

function logOut() {

  if (axios.defaults.headers.common.Authorization) {
    axios
    .get('http://192.168.1.56:8000/api/auth/logout/')
    .then(response => {
      axios.defaults.headers.common.Authorization = null;
      console.log('User logout! ', response.status, response.statusText);
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
  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { colors } = useTheme();

  return (
    <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
      <Drawer.Section title="Menu">
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
      </Drawer.Section>
      <Drawer.Section title="Mi Cuenta">
        <TouchableRipple onPress={logOut}>
          <View style={styles.preference}>
            <Text>Cerrar Session</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
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
  },
});

export default MenuItems;
