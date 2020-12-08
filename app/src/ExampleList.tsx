import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { List, Divider, useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import LanguageComponent from './components/LanguageComponent';
import StayBikeNavigation from './components/StayBikeNavigation';
import EditRegisterComponent from './components/EditRegisterComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import PushNotificationComponent from './components/PushNotificationComponent';


export const examples: Record<
  string,
  React.ComponentType<any> & { title: string }
> = {
  loginComponent: LoginComponent,
  registerComponent: RegisterComponent,
  languageComponent: LanguageComponent,
  stayBikeNavigation: StayBikeNavigation,
  editRegisterComponent : EditRegisterComponent,
  forgotPasswordComponent : ForgotPasswordComponent,
  pushNotificationComponent : PushNotificationComponent,
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