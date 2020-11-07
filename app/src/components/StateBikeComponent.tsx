import React, { useEffect , useState} from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button, IconButton, Title } from 'react-native-paper';
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper'
 

const StateBikeComponent = () => {

    const [userNameLogin, setUserNameLogin]=  useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        loadValue(USER_KEY, setUserNameLogin);
        
        axios
          .get('estadia-getStateBike/'+userNameLogin+'/')
          .then(json => {
                setData(json.data)
                console.log('ok state bike ', json.data)
            })
          .catch((error) => {
            console.log('error estadia get ', userNameLogin);
            setData({});
          })

    }, [userNameLogin]);
   
    const buildMessage = (nroParking: number, placeNumber: number) => 
                          "Bicicletero " + nroParking +" en el lugar "+placeNumber; 
   
    return (
        <>
        { (data.number) ? 
        (
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
        ) :
        <Text style={{marginTop:30}}> No tiene ninguna estadia activa</Text>
        }
        </>
    );
}

export default StateBikeComponent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    button: {
      justifyContent: 'center',
      margin: 4,
      height: 50,
    },
});