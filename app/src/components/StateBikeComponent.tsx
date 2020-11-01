import React, { useEffect , useState} from "react";
import {  StyleSheet, View  } from 'react-native';
import {   Card, Button, IconButton, Title } from 'react-native-paper';
import { inputReducer } from '../../utils';


const StateBikeComponent = () => {
    //CARGA DATOS EXISTENTES (bicycleParking)
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://192.168.1.108:8000/api/bicycleParking-get/1')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

    //CARGA DATOS EXISTENTES (bicycleParking)
    const  userName= 'Test_3';
    const [isLoading2, setLoading2] = useState(true);
    const [data2, setData2] = useState({});
    
    useEffect(() => {
        fetch('http://192.168.1.108:8000/api/estadias-getUser/'+userName+'/') //ya no es por id!!!
          .then((response) => response.json())
          .then((json) => setData2(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading2(false));
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