import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from 'react-native';

//const STORAGE_KEY = 'userName'
const STORAGE_KEY = 'userName'
    
const HistoryComponent = () => {
    //Hacerlo desde la API a la relacion
    const [userNameLogin, setUserNameLogin]=  useState("");
    const  load = async () => {
      try {
        let userAux= await AsyncStorage.getItem(STORAGE_KEY);
        setUserNameLogin(userAux)
    
      } catch (e) {
        console.error('Failed to load .')
      }
    }
    

  const [isLoading, setLoading] = useState(true);
  //CARGA DATOS EXISTENTES (estadía)
  const [data, setData] = useState({});
  //.get('notificationEgress-getUser/'+userNameLogin+'/')
  useEffect(() => {
    load() //AsyncStorage
      axios
        .get('notificationEgress-getUser/'+userNameLogin+'/')
        .then(json => {
              setData(json.data)
              console.log('ok estadia ', json.data)
              setLoading(false)
          })
        .catch((error) => console.log('error estadia get ',userNameLogin))
    }, [userNameLogin]);
  
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
  //<Text> {data.placeUsed} | {data.dateCreated} | {data.userName}</Text>
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.place.toString()} | {format(new Date(item.dateCreated), 'dd-MM-yyyy HH:mm:sss')} | {item.userName} </Text>
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
