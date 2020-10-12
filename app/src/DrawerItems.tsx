import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Drawer,
  Switch,
  TouchableRipple,
  Text,
  Colors,
  useTheme,
} from 'react-native-paper';

type Props = {
  toggleTheme: () => void;
  toggleRTL: () => void;
  isRTL: boolean;
  isDarkTheme: boolean;
};

const DrawerItemsData = [
  { label: 'Inicio', icon: 'home', key: 0 },
  { label: 'Estadia', icon: 'heart', key: 1 },
  { label: 'Historial', icon: 'book', key: 2 },
  { label: 'Mi Perfil', icon: 'send', key: 3 },
];

const DrawerItems = ({ toggleTheme, toggleRTL, isRTL, isDarkTheme }: Props) => {
  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { colors } = useTheme();

  return (
    <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
      <Drawer.Section title="Example items">
        {DrawerItemsData.map((props, index) => (
          <Drawer.Item
            {...props}
            key={props.key}
            theme={
              props.key === 1 || props.key === 3
                ? { colors: { primary: Colors.tealA200 } }
                : undefined
            }
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

export default DrawerItems;
