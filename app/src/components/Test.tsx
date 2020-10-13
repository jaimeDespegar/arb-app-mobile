import * as React from 'react';
import {  Text, StyleSheet, Image, View, TouchableOpacity  } from 'react-native';
import ImagePicker from 'react-native-image-picker';


const Test = () => {
  var fileUri = '';
  //SetFileuri
  const chooseImage = () => {
    let options = {
      title: 'Select Avatar', 
      cameraType: 'front',mediaType: 'photo' ,
      storageOptions: {skipBackup: true,path: 'images',},
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {console.log('User cancelled image picker');} 
      else if (response.error) {console.log('ImagePicker Error: ', response.error);} 
      else if (response.customButton) {console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);} 
      else {
        console.log(response.uri) //update state to update Image
      }
    });
  }
  return (
    <View style={{alignSelf: 'center',marginTop: 35,}}>
      <Image style={{ height: 100, width: 100, borderRadius: 50, }}
        source={fileUri ? { uri: fileUri } : ''}
      />
      <TouchableOpacity style={styles.addPictureIcon} onPress={()=>chooseImage()}>
      <Text style={styles.forgotMyPasswordText}>
                  Cargar Imagen
                </Text>
      </TouchableOpacity>
    </View>
  );
};

Test.title = 'Test';

const styles = StyleSheet.create({ 
  addPictureIcon: {
    height: 30,width: 30,
    backgroundColor: 'white', borderRadius: 50,position: 'absolute',
    left: 65,top: 75,justifyContent: 'center',alignItems: 'center',
  }
});

export default Test;