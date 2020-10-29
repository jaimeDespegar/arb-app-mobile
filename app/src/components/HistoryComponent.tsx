// Historial Mobile
// https://callstack.github.io/react-native-paper/chip.html
// Usar Card

// Hay que mostrar las últimas estad{ias que realizo.
// Primero probarlo con el getall,....

//Luego hacer el StateBikeComponent

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, } from 'react-native';


const HistoryComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.103:8000/api/estadias-getAll/')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  console.log(data) //es el print()

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
            <Text>{item.placeUsed} | {item.dateCreated} | {item.userEmail} | {item.isAnonymous}</Text>
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