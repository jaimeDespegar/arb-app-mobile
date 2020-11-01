import React, { useEffect , useState} from "react";
import {  StyleSheet, View  } from 'react-native';
import {   Card, Button, IconButton, Title } from 'react-native-paper';
import axios from 'axios';


const StateBikeComponent = () => {
    //CARGA DATOS EXISTENTES (bicycleParking)
    
    const [data, setData] = useState({});
    axios.defaults.timeout = 1500;

    useEffect(() => {
        axios
          .get('bicycleParking-get/1')
          .then(json => {
                setData(json.data)
                console.log('ok bicycle ', json.data)
            })
          .catch((error) => console.log('error bicycle get 1'))
      }, []);

    //CARGA DATOS EXISTENTES (bicycleParking)
    const [data2, setData2] = useState({});
    useEffect(() => {
        axios
          .get('estadias-get/8')
          .then(json => {
                setData2(json.data)
                console.log('ok estadia ', json.data)
            })
          .catch((error) => console.log('error estadia get 8'))
      }, []);

    const buildMessage = (nroBicicletero: number, 
                          placeNumber: number) => 
                          "Bicicletero " + nroBicicletero +" en el lugar "+placeNumber; 
    //const description = "Enfrente del modulo 2";
   
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Title>Mi Bicicleta</Title>
            </View>
            <Card style={styles.card}>
                <Card.Cover source={require('../../assets/images/biciUNGS.png')} />
                <Card.Title
                    title={buildMessage(data.number, data2.placeUsed)}
                    subtitle={data.description}
                right={(props: any) => (
                    <IconButton {...props} icon="bike" onPress={() => {}} />
                )}
                />
            </Card>
            <View style={styles.viewButton}>
                <Button mode="outlined" icon="image" onPress={() => {}} style={styles.button}>
                    Actualizar foto
                </Button>
            </View>
        </View>
    );
}

export default StateBikeComponent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    viewButton: {
     //   alignItems: 'center'
    },
    button: {
      justifyContent: 'center',
      margin: 4,
      height: 50,
      //width: '50%'
    },
});  