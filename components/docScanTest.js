import React, {useRef, useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import DocScanner from '@woonivers/react-native-document-scanner';
import CustomCrop from 'react-native-perspective-image-cropper';
import Permissions from 'react-native-permissions';

const DocScan = () => {
  const docScannerElement = useRef(null);
  const customCropElement = useRef(null);
  const [data, setData] = useState({});
  const [cameraAllowed, setCameraAllowed] = useState(false);
  //   const [imageWidth, setImageWidth] = useState(0);
  //   const [imageHeight, setImageHeight] = useState(0);
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

  const updateImage = (croppedImage, newCoords) => {
    // setData(prev => {
    //   let newState = {
    //     ...prev,
    //     image: croppedImage,
    //     rectangeCoordinates: newCoords,
    //   };
    //   return newState;
    // });
    // setRectangeCoordinates(newCoords);
  };

  const handleOnPress = () => {
    console.log('capturing pic');
    docScannerElement.current.capture();
  };

  // reset data for next picture
  const handleOnPressRetry = () => {
    setData({});
  };

  const handleOnCrop = () => {
    customCropElement.current.crop();
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
      <View style={styles.topBar}>
        <Text style={styles.buttonText}>Scanner</Text>
      </View>

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

      {data.croppedImage ? (
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleOnPress} style={styles.button}>
            <Text style={styles.buttonText}>Take picture</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

{
  /* <View style={styles.scanner}>
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

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleOnPress} style={styles.button}>
          <Text style={styles.buttonText}>Take picture</Text>
        </TouchableOpacity>
      </View> 
*/
}

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
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
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
