import * as React from 'react';
import {  StyleSheet, View  } from 'react-native';
import {   Card, Button, IconButton, Title } from 'react-native-paper';
import { inputReducer } from '../../utils';


const StateBikeComponent = () => {
    const buildMessage = (nroBicicletero: number, 
                          placeNumber: number) => 
                          "Bicicletero " + nroBicicletero +" en el lugar "+placeNumber; 
    const description = "Enfrente del modulo 2";

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Title>Mi Bicicleta</Title>
            </View>
            <Card style={styles.card}>
                <Card.Cover source={require('../../assets/images/forest.jpg')} />
                <Card.Title
                    title={buildMessage(2, 10)}
                    subtitle={description}
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