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

  //   if (data.croppedImage) {
  //     console.log(data);
  //     return (
  //       <>
  //         <Image source={{uri: data.croppedImage}} style={styles.preview} />
  //         {/* Crop button */}

  //         {/* <CustomCrop
  //           ref={customCropElement}
  //           updateImage={updateImage}
  //           rectangeCoordinates={rectangeCoordinates}
  //           initialImage={data.initialImage}
  //           height={data.height}
  //           width={data.width}
  //           overlayColor="rgba(18, 190, 210, 1)"
  //           overlayStrokeColor="rgba(20, 190, 210, 1)"
  //           handlerColor="rgba(20, 150, 160, 1)"
  //           enablePanStrict={false}
  //         /> */}

  //         {/* <TouchableOpacity onPress={handleOnCrop} style={styles.button}>
  //           <Text style={styles.buttonText}>Crop image</Text>
  //         </TouchableOpacity> */}

  //         {/* Retry taking image */}
  //         <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
  //           <Text style={styles.buttonText}>Retry</Text>
  //         </TouchableOpacity>
  //       </>
  //     );
  //   }

  return (
    <>
      {/* <View style={styles.topBar}>
        <Text style={styles.buttonText}>Scanner</Text>
      </View> */}

      {/* When we have the cropped image, show the image, otherwise show camera output */}
      {data.croppedImage ? (
        <View style={styles.scanner}>
          <Image source={{uri: data.croppedImage}} style={styles.preview} />
        </View>
      ) : (
        <View style={styles.scanner}>
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
        </View>
      )}
      {/* show retry button after taking picture, otherwise take picture button */}
      {data.croppedImage ? (
        <View style={styles.bottomBar}>
          <Button
            onPress={handleOnPressRetry}
            style={styles.button}
            title="Retry"
          />

          <Button onPress={handleOnCrop} style={styles.button} title="Crop" />
        </View>
      ) : (
        <View style={styles.bottomBar}>
          <Button
            onPress={handleOnPress}
            style={styles.button}
            title="Take picture"
          />
        </View>
      )}
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
