import * as React from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StylesInputs, StylesButton, StylesWelcome} from './utils/StylesHelper';

const AvailabilityParkingComponent = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [labels, setLabels] = useState({});
  
  const checkAvailability = () => {
    axios
      .get('bicycleParking-availability/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error))
  }
  
  useEffect(() => {     
    async function test() {
      const data = await getLabel();
      setLabels(data.availabilityParking || {});
    }
    checkAvailability();
    test();
  }, [labels]);
  
  const stylesContainer = {
    ...StylesInputs,
  };

  const getColor = (parking) => (parking.freePlaces >= 1)? '#82b74b':'red';
  const buildTitleItem = (parking) => {
    return parking.freePlaces < 1 ? labels.withOutAvailability: 
    (parking.freePlaces === 1 ? labels.oneFreePlace : labels.freePlaces.replace('{0}', parking.freePlaces))
  }

  return (
    <View style={stylesContainer}>
      <List.Section title={labels.title} style={{paddingLeft: 5, paddingRight: 3}}>
        {
          (data.length) ? (
            data.map((parking) => (
              <List.Accordion
                key={parking.number}
                title={labels.titleItemParking + parking.number}
                description={parking.description}
                style={{backgroundColor: getColor(parking), height: 65, width: '100%'}}
                left={props => <List.Icon {...props} icon="bike" />}>
                <List.Item title={buildTitleItem(parking)} 
                           style={{backgroundColor: getColor(parking) }} />
              </List.Accordion>
            ))
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text>{labels.noResults}</Text>
            </View>
          )
        }
      </List.Section>


      <Button mode="contained" onPress={checkAvailability} style={StylesButton}>
        {labels.buttonRefresh}
        <Icon
                  name="wrench"
                  color="#000"
                  size={30}
            />
      </Button>
    </View>
  );
};

AvailabilityParkingComponent.title = 'Availability Parking';


export default AvailabilityParkingComponent;