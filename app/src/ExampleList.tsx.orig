import * as React from 'react';
import { FlatList } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

<<<<<<< HEAD
import AppbarExample from './Examples/AppbarExample';
import LoginComponent from './Examples/LoginComponent';
import RegisterComponent from './Examples/RegisterComponent';
import BottomNavigationExample from './Examples/BottomNavigationExample';
import EntranceParkingComponent from './Examples/EntranceParkingComponent';
import EgressParkingComponent from './Examples/EgressParkingComponent';
=======
import AppbarExample from './components/AppbarExample';
import BottomNavigationExample from './components/BottomNavigationExample';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RecoveryAccountComponent from './components/RecoveryAccountComponent';
>>>>>>> ec619847dcef46ec5ac58020ffb331c6c72b3f6f

export const examples: Record<
  string,
  React.ComponentType<any> & { title: string }
> = {
  appbar: AppbarExample,
  bottomNavigation: BottomNavigationExample,
  loginComponent: LoginComponent,
  registerComponent: RegisterComponent,
<<<<<<< HEAD
  entranceParkingComponent: EntranceParkingComponent,
  egressParkingComponent: EgressParkingComponent
=======
  recoveryAccountComponent: RecoveryAccountComponent,
>>>>>>> ec619847dcef46ec5ac58020ffb331c6c72b3f6f
};

type Props = {
  navigation: StackNavigationProp<{ [key: string]: undefined }>;
};

type Item = {
  id: string;
  data: typeof examples[string];
};

const data = Object.keys(examples).map(
  (id): Item => ({ id, data: examples[id] })
);

export default function ExampleList({ navigation }: Props) {
  const renderItem = ({ item }: { item: Item }) => (
    <List.Item
      title={item.data.title}
      onPress={() => navigation.navigate(item.id)}
    />
  );

  const keyExtractor = (item: { id: string }) => item.id;

  const { colors } = useTheme();
  const safeArea = useSafeArea();
 
  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingBottom: safeArea.bottom,
      }}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data}
    />
  );
}