// App.js
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default function App() {
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        {({camera, status}) => {
          if (status !== 'READY') return <Text>Loading...</Text>;
          return (
            <View style={styles.captureContainer}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}
              >
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const takePicture = async function(camera) {
  const options = {quality: 0.5, base64: true};
  const data = await camera.takePictureAsync(options);
  console.log(data.uri);
};

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', backgroundColor: 'black'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  captureContainer: {flex: 0, flexDirection: 'row', justifyContent: 'center'},
  capture: {flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20}
});
