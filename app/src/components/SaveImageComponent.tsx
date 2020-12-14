import React from 'react';
import { Button, View, Text } from 'react-native';
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'


const SaveImageComponent = () => {
  const _mediaLibraryAsync = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync()
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
    })
    let video = await MediaLibrary.getAssetInfoAsync(media.assets[0])

    console.log(video);
  };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={_mediaLibraryAsync}
          title="Do MediaLibrary Stuff"
        />
      </View>
    );
  
}
SaveImageComponent.title = 'SaveImage';

export default SaveImageComponent;