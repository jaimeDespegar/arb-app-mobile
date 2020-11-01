import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, } from 'react-native';
import { format } from 'date-fns';


const HistoryComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => { 
    axios
      .get('estadias-getAll/')
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
