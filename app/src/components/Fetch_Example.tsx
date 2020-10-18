import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import axios from "axios";

const Fetch_Example = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    //http://127.0.0.1:8000/api/bicycleParking-get/1/
    //http://181.46.71.111:8000/api/bicycleParking-get/1/
    //https://reactnative.dev/movies.json
    useEffect(() => {
      fetch('https://reactnative.dev/movies.json')
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        )}
      </View>
    );
};

Fetch_Example.title = 'Fetch_Example';

export default Fetch_Example;