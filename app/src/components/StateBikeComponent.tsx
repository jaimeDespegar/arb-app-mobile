import React, { useEffect , useState} from "react";
import {  StyleSheet, View } from 'react-native';
import {   Card, Button, IconButton, Title } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from 'react-native';
//const STORAGE_KEY = 'userName'


const StateBikeComponent = () => {
    //Hacerlo desde la API a la relacion 

    const STORAGE_KEY = 'userName'

    const [userNameLogin, setUserNameLogin]=  useState("");
    const  load = async () => {
      console.log("load")
      try {
        let userAux= await AsyncStorage.getItem(STORAGE_KEY);
        setUserNameLogin(userAux)
        //alert(userNameLogin);
    
      } catch (e) {
        console.error('Failed to load .')
      }
    }
    

    
    const [data, setData] = useState({});
    useEffect(() => {
        load() //AsyncStorage
        
        axios
          .get('estadia-getStateBike/'+userNameLogin+'/')
          .then(json => {
                setData(json.data)
                console.log('ok estadia ', json.data)
            })
          .catch((error) => console.log('error estadia get ',userNameLogin))
      }, [userNameLogin]);
      console.log("data: ")
      console.log(data)
    const buildMessage = (nroBicicletero: number, 
                          placeNumber: number) => 
                          "Bicicletero " + nroBicicletero +" en el lugar "+placeNumber; 
    //const description = "Enfrente del modulo 2";
   
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Title>Bicicleta de {userNameLogin}</Title>
            </View>
            <Card style={styles.card}>
                <Card.Cover source={require('../../assets/images/biciUNGS.png')} />
                <Card.Title
                    title={buildMessage(data.number, data.placeNumber)}
                    subtitle={data.description}
                right={(props: any) => (
                    <IconButton {...props} icon="bike" onPress={() => {}} />
                )}
                />
            </Card>
            <View style={styles.viewButton}>
                <Button mode="outlined" icon="image" onPress={() => {}} style={styles.button}>
                    Actualizar 
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
