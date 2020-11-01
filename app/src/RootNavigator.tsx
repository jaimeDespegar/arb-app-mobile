import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleList, { examples } from './ExampleList';
import axios from 'axios';

const Stack = createStackNavigator();

export default function Root() {

  useEffect(() => {
    // 192.168.1.103
    axios.defaults.baseURL = 'http://192.168.1.56:8000/api/';
    axios.defaults.timeout = 1500;
  }, [])

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header>
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : (navigation as any).openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
              />
            ) : null}
            <Appbar.Content title={scene.descriptor.options.title} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={ExampleList}
        options={{ title: 'App' }}
      />
      {(Object.keys(examples) as Array<keyof typeof examples>).map(id => (
        <Stack.Screen
          key={id}
          name={id}
          component={examples[id]}
          options={{ title: examples[id].title }}
        />
      ))}
    </Stack.Navigator>
  );
}