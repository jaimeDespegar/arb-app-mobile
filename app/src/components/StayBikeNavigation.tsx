import React, { useState, useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import AvailabilityParkingComponent from './AvailabilityParkingComponent';
import StayParkingComponent from './StayParkingComponent';
import StateBikeComponent from './StateBikeComponent';
import HistoryComponent from './HistoryComponent';
import { getLabel } from './utils/LanguageHelper';


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
  const [labels, setLabels] = useState({});

  const indexChange = (index) => {
    setIndex(index);
    setRenderItems(renderSceneItems);
  }

  const [routes] = React.useState<RoutesState>([
    { 
      key: 'myStay', 
      title: labels.myStay, 
      icon: 'image-album', 
      color: '#6200ee' 
    },
    {
      key: 'stateMyBike',
      title: labels.stateMyBike,
      icon: 'inbox',
      color: '#2962ff',
      badge: true, // tilde de seleccionado
    },
    {
      key: 'available',
      title: labels.available,
      icon: 'heart',
      color: '#00796b',
    },
    {
      key: 'history',
      title: labels.history,
      icon: 'book',
      color: '#c51162',
    },
  ]);

  useEffect(() => {
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.stayBikeNavigation || {});
    }
    findLabels();
  }, [labels]);

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