import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import DocScanner from '@woonivers/react-native-document-scanner';
import Permissions from 'react-native-permissions';

const DocScan = ({navigation}) => {
  const docScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [rectangeCoordinates, setRectangeCoordinates] = useState({
    topLeft: {x: 10, y: 10},
    topRight: {x: 10, y: 10},
    bottomRight: {x: 10, y: 10},
    bottomLeft: {x: 10, y: 10},
  });

  // get permissions for camera
  useEffect(() => {
    async function requestCamera() {
      const status = await Permissions.request(
        Platform.OS === 'android'
          ? 'android.permission.CAMERA'
          : 'ios.permission.CAMERA',
      );
      console.log(status);
      if (status === 'granted') {
        setCameraAllowed(true);
      }
    }
    requestCamera();
  }, []);

  // if (!cameraAllowed) {
  //   console.log('Give permission to use camera');
  //   return (
  //     <View style={styles.permissions}>
  //       <Text>Accept camera perms bruh</Text>
  //     </View>
  //   );
  // }

  const handleOnPress = () => {
    console.log('capturing pic');
    docScannerElement.current.capture();
  };

  // reset data for next picture
  const handleOnPressRetry = () => {
    setData({});
  };

  const handleOnCrop = () => {
    // customCropElement.current.crop();
    navigation.navigate('Crop', {data});
  };

  return (
    <>
      {/* <View style={styles.topBar}>
        <Text style={styles.buttonText}>Scanner</Text>
      </View> */}

      {/* When we have the cropped image, show the image, otherwise show camera output */}

      <View style={styles.scanner}>
        {data.croppedImage ? (
          <Image source={{uri: data.croppedImage}} style={styles.preview} />
        ) : (
          <DocScanner
            ref={docScannerElement}
            style={styles.scanner}
            onPictureTaken={data => setData(data)}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            quality={0.5}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
          />
        )}
      </View>

      {/* show retry button after taking picture, otherwise take picture button */}
      <View style={styles.bottomBar}>
        {data.croppedImage ? (
          <>
            <Button
              onPress={handleOnPressRetry}
              style={styles.button}
              title="Retry"
            />
            <Button onPress={handleOnCrop} style={styles.button} title="Crop" />
          </>
        ) : (
          <Button
            onPress={handleOnPress}
            style={styles.button}
            title="Take picture"
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    backgroundColor: 'powderblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    flex: 6,
    aspectRatio: undefined,
    backgroundColor: 'skyblue',
  },
  bottomBar: {
    flex: 1,
    backgroundColor: 'steelblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    // alignSelf: 'center',
    // position: 'absolute',
    width: 50,
    bottom: 32,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DocScan;
