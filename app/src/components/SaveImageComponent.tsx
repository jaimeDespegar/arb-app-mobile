import React, { useEffect , useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
//import RNFetchBlob from 'rn-fetch-blob';

import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob

const SaveImageComponent = () => {
  const state = {
    url: '',
    saving: false,
  };

  const updateUrl = url => {
    this.setState({url});
  };

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  const handleDownload = async () => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await this.getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    this.setState({saving: true});
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', this.state.url)
      .then(res => {
        CameraRoll.saveToCameraRoll(res.data, 'photo')
          .then(() => {
            Alert.alert(
              'Save remote Image',
              'Image Saved Successfully',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .catch(err => {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .finally(() => this.setState({saving: false}));
      })
      .catch(error => {
        this.setState({saving: false});
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

    
    useEffect(() => {
        const {url, saving} = this.state;
    }, []);


    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.app}>
            {saving ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <Text style={styles.headerText}>
                  React Native Image Downloader
                </Text>
                <View style={styles.textInputWrapper}>
                  <TextInput
                    placeholder="Enter image url here"
                    style={styles.textInput}
                    value={url}
                    onChangeText={text => this.updateUrl(text)}
                  />
                </View>
                <Image source={{uri: url}} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={this.handleDownload}>
                  <Text>Download Image</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </SafeAreaView>
      </>
    );
}
SaveImageComponent.title = 'SaveImage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2FF345CC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  app: {
    backgroundColor: '#11131B',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerText: {
    marginTop: 50,
    fontSize: 26,
    color: 'white',
  },
  textInputWrapper: {
    marginTop: 30,
    alignSelf: 'stretch',
    padding: 10,
  },
  textInput: {
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 3,
  },
  imagePreview: {
    height: 300,
    width: 300,
    backgroundColor: 'purple',
    marginTop: 30,
  },
  downloadButton: {
    backgroundColor: 'white',
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});


export default SaveImageComponent;