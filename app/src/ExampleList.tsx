import * as React from 'react';
import { FlatList } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

import BottomNavigationExample from './components/BottomNavigationExample';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RecoveryAccountComponent from './components/RecoveryAccountComponent';
import EntranceParkingComponent from './components/EntranceParkingComponent';
import EgressParkingComponent from './components/EgressParkingComponent';
export const examples: Record<
  string,
  React.ComponentType<any> & { title: string }
> = {
  bottomNavigation: BottomNavigationExample,
  loginComponent: LoginComponent,
  registerComponent: RegisterComponent,
  recoveryAccountComponent: RecoveryAccountComponent,
  entranceParkingComponent: EntranceParkingComponent,
  egressParkingComponent: EgressParkingComponent
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
