import React, { useEffect , useState} from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button, IconButton, Title } from 'react-native-paper';
import axios from 'axios';
import { loadValue, USER_KEY } from './utils/StorageHelper'
import { StylesContainer, StylesButton, StylesWelcome} from './utils/StylesHelper';
import { getLabel } from './utils/LanguageHelper';

const StateBikeComponent = () => {

    const [userNameLogin, setUserNameLogin]=  useState("");
    const [data, setData] = useState({});
    const [labels, setLabels] = useState({});

    const [dataDefaultImage, setDataDefaultImage] = useState('../../assets/images/biciUNGS.png');
    
    useEffect(() => {
        loadValue(USER_KEY, setUserNameLogin);
        axios
          .get('estadia-getStateBike/'+userNameLogin+'/')
          .then(json => {
            setData(json.data);
          })
          .catch((error) => {
            console.log('error estadia get ', userNameLogin, error);
            setData({});
          })

        async function findLabels() {
            const data = await getLabel();
            setLabels(data.stateBike || {});
        }
        findLabels();
    }, [userNameLogin, labels]);
   
    const buildMessage = (nroParking: number, placeNumber: number) => 
                          labels.parkingText.replace('{0}', nroParking)
                                            .replace('{1}', placeNumber);
    
    // FALTA AGREGAR FOTOS DINAMICAMENTE 
    const actualizar = () =>{
        //actualImage= '../../assets/images/estadoBicicletero.jpg'
        //setDataDefaultImage(actualImage)
    }
    
    return (
        <>
        { (data.number) ? 
        (
        <View style={StylesContainer}>
            <View style={{ alignItems: 'center' }}>
                <Title>{labels.bicycleFrom + userNameLogin}</Title>
            </View>
            <Card style={styles.card}>
                <Card.Cover source={{uri: data.photo}} />
                <Card.Title
                    title={buildMessage(data.number, data.placeNumber)}
                    subtitle={data.description}
                    right={(props: any) => (
                        <IconButton {...props} icon="bike" onPress={() => {}} />
                    )}
                />
            </Card>
            <View style={styles.viewButton}>
                <Button mode="outlined" icon="image" onPress={() => actualizar()} style={styles.button}>
                    {labels.buttonRefresh}
                </Button>
            </View>
        </View>
        ) :
            <Text style={{marginTop:30, textAlign: 'center'}}>{labels.thereAreNotActiveStays}</Text>
        }
        </>
    );
}

export default StateBikeComponent;

const styles = StyleSheet.create({
});
