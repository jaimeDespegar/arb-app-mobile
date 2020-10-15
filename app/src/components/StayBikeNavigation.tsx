import * as React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import AvailabilityParkingComponent from './AvailabilityParkingComponent';
import EntranceParkingComponent from './EntranceParkingComponent';
import StateBikeComponent from './StateBikeComponent';

type RoutesState = Array<{
  key: string;
  title: string;
  icon: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

type Route = { route: { key: string } };

const History = () => {
  return (
        <View style={styles.item}>
          <Text>Aca va las ultimas estadias!</Text>
        </View>
  );
};

const StayBikeNavigation = () => {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<RoutesState>([
    { 
      key: 'myStay', 
      title: 'Mi Estadia', 
      icon: 'image-album', 
      color: '#6200ee' 
    },
    {
      key: 'stateMyBike',
      title: 'Estado',
      icon: 'inbox',
      color: '#2962ff',
      badge: true,
    },
    {
      key: 'available',
      title: 'Disponibilidad',
      icon: 'heart',
      color: '#00796b',
    },
    {
      key: 'history',
      title: 'Historial',
      icon: 'book',
      color: '#c51162',
    },
  ]);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={index => setIndex(index)}
      renderScene={BottomNavigation.SceneMap({
        myStay: EntranceParkingComponent,
        stateMyBike: StateBikeComponent,
        available: AvailabilityParkingComponent,
        history: History,
      })}
      sceneAnimationEnabled={false}
    />
  );
};

StayBikeNavigation.title = 'Estadia';

const styles = StyleSheet.create({});

export default StayBikeNavigation;