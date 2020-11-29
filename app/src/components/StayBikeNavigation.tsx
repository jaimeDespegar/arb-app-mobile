import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import AvailabilityParkingComponent from './AvailabilityParkingComponent';
import StayParkingComponent from './StayParkingComponent';
import StateBikeComponent from './StateBikeComponent';
import HistoryComponent from './HistoryComponent';

type RoutesState = Array<{
  key: string;
  title: string;
  icon: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;


const StayBikeNavigation = () => {

  const renderSceneItems = {
    myStay: StayParkingComponent,
    stateMyBike: StateBikeComponent,
    available: AvailabilityParkingComponent,
    history: HistoryComponent,
  }

  const [index, setIndex] = React.useState<number>(0);
  const [renderItems, setRenderItems] = React.useState(renderSceneItems);
  
  const indexChange = (index) => {
    setIndex(index);
    setRenderItems(renderSceneItems);
  }

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
      badge: true, // tilde de seleccionado
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
      onIndexChange={index => indexChange(index)}
      renderScene={BottomNavigation.SceneMap(renderItems)}
      sceneAnimationEnabled={false}
    />
  );
};

StayBikeNavigation.title = 'Estadia';

export default StayBikeNavigation;