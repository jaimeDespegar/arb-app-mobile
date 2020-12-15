import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { USER_KEY, loadValue } from './utils/StorageHelper';
import { TextInput, Button, List } from 'react-native-paper';
import { inputReducer } from '../../utils';
import { getLabel } from './utils/LanguageHelper';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
  fromDate: new Date(),
  toDate: new Date()
};

const HistoryComponent = () => {

  const [userNameLogin, setUserNameLogin]=  useState("");
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('date');
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const [labels, setLabels] = useState({});

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
  });

  const parseDate = (date, formatDate) => format(new Date(date), formatDate);

  const {
    fromDate,
    toDate
  } = state;

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDate(false);
    inputActionHandler('fromDate', currentDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDate(false);
    inputActionHandler('toDate', currentDate);
  };

  const showModeFromDate = () => {
    setShowFromDate(true);
    setMode('date');
  };

  const showModeToDate = () => {
    setShowToDate(true);
    setMode('date');
  };

  const findStays = (fromDate, toDate) => {
    
    let urlToGetStays = 'estadia/find?userName='+userNameLogin+'&isActive=false';

    if (fromDate && toDate) {
      urlToGetStays += '&fromDate=' + parseDate(fromDate, 'yyyy-MM-dd 00:00:00') + '&toDate=' + parseDate(toDate, 'yyyy-MM-dd 23:59:59');  
    }

    if (userNameLogin) {
      axios
      .get(urlToGetStays)
      .then(json => {
        setData(json.data)
      })
      .catch((error) => {
        console.log('error estadia history ',userNameLogin);
        setData([])
      })
    } else {
      console.log('usuario no cargado')
    }
  }

  useEffect(() => {
    loadValue(USER_KEY, setUserNameLogin);
    findStays('', '');
    async function findLabels() {
      const data = await getLabel();
      setLabels(data.history || {});
    }
    findLabels();
  }, [userNameLogin, labels]);
  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View>
        <TextInput
          label={labels.fromDate}
          placeholder={labels.fromDatePlaceholder}
          value={format(fromDate, '00:00:00 dd-MM-yyyy')}
          onChangeText={(value) => inputActionHandler('fromDate',value)}
          disabled={true}
          right={
            <TextInput.Icon
              name={'calendar'}
              onPress={showModeFromDate}
              forceTextInputFocus={false}
            />
          }
        />
        <TextInput
          label={labels.toDate}
          placeholder={labels.toDatePlaceholder}
          value={format(toDate, '23:59:59 dd-MM-yyyy')}
          onChangeText={(value) => inputActionHandler('toDate',value)}
          disabled={true}
          right={
            <TextInput.Icon
              name={'calendar'}
              onPress={showModeToDate}
              forceTextInputFocus={false}
            />
          }
        />
        <Button mode="outlined" 
                onPress={() => {findStays(fromDate, toDate)}} 
                style={styles.button}>
          {labels.buttonSearchStays}
          <Icon
                  name="search"
                  color="#000"
                  size={30}
            />
        </Button>
      </View>
      <View>
        {showFromDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode={mode}
            is24Hour={true}
            display="default"
            dateFormat='yyyy-MM-dd HH:mm:ss'
            onChange={onChangeFromDate}
          />
        )}
        {showToDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate}
            mode={mode}
            is24Hour={true}
            display="default"
            dateFormat='yyyy-MM-dd HH:mm:ss'
            onChange={onChangeToDate}
          />
        )}
      </View>
      <View>
        <List.Section title={labels.myStays}>
          {
          (!data.length) ? 
          (
          <Text style={{marginTop:30 , textAlign: 'center'}}>{labels.thereAreNotRegisteredStays}</Text>
          ) : 
          data.map((item) => (
            <List.Accordion
              key={item.dateCreated}
              title={labels.stayInPlace.replace('{0}', item.placeUsed.toString())}
              description={labels.generatedOn + parseDate(item.dateCreated, 'dd-MM-yyyy')}
              left={props => <List.Icon {...props} icon="image-album" />}>
              <List.Item title={labels.arrival} 
                         description={labels.entranceTo + parseDate(item.arrival.dateCreated, 'HH:mm:ss')}/>
              <List.Item title={labels.departure} 
                         description={labels.egressTo + parseDate(item.departure.dateCreated, 'HH:mm:ss')}/>
            </List.Accordion>
          ))}

        </List.Section>
      </View>
    </View>
  );
};

HistoryComponent.title = 'History Estadias';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
  },
  button: {
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
});

export default HistoryComponent;
