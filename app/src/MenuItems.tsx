import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Alert, BackHandler } from 'react-native';
import {
  Drawer, Switch, TouchableRipple,
  Text, Colors, useTheme,
} from 'react-native-paper';
import axios from 'axios';
import DialogCustom from './components/Dialogs/DialogCustom'
import { removeValue, USER_KEY } from './components/utils/StorageHelper';
import { getLabel } from './components/utils/LanguageHelper';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

type Props = {
  toggleTheme: () => void;
  toggleRTL: () => void;
  isRTL: boolean;
  isDarkTheme: boolean;
};

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
  const [labels, setLabels] = useState({});

  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.logout || {});
    }
    findLabels();
  }, [labels]);

  return (
    <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>

      <Button mode="outlined" onPress={() => BackHandler.exitApp()} style={styles.button}>
        Salir
      </Button>
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
