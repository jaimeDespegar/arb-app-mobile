import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import { format } from 'date-fns';

const STORAGE_KEY = 'userName'

let userNameLogin
const  load = async () => {
  try {
    userNameLogin = await AsyncStorage.getItem(STORAGE_KEY);
    alert(userNameLogin);
  } 
  catch (e) {
    //console.error('Failed to load .')
  }
}

const HistoryComponent = () => {
  load() //AsyncStorage

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
//.get('estadias-getUser/'+userNameLogin+'/')
//.get('estadias-getAll')
  useEffect(() => { 
    axios
    .get('estadias-getAll')
      .then((response) => response.data)
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((error) => console.error('error history component'))
  }, []);
  
  console.log(data)

  const separador = () => {
    return(
        <View style={{
            height: 5,
            width: "100%",
            backgroundColor: "black",
            marginVertical: 10
        }}>
        </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.placeUsed.toString()} | {format(new Date(item.dateCreated), 'dd-MM-yyyy HH:mm:sss')} | {item.userName} </Text>
          )}
          horizontal= {false}
          ItemSeparatorComponent=  {() => separador()}
          ListEmptyComponent={<Text style={{marginTop:30}}>
               No hay estadías registradas</Text>}
        />
      )}
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
});

export default HistoryComponent;
