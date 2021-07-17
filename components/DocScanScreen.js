import React, {useRef, useState, useEffect} from 'react';
import {View, Image} from 'react-native';

import CustomButton from './CustomButton';
import commonStyles from '../constants/commonStyles';

import DocScanner from '@woonivers/react-native-document-scanner';
import Permissions from 'react-native-permissions';

const DocScan = ({navigation}) => {
  const docScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [cameraAllowed, setCameraAllowed] = useState(false);

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
    //   navigate to the cropping screen
    navigation.navigate('Crop', {data});
  };

  const handleOnPictureTaken = data => {
    setData(data);
    navigation.navigate('Crop', {data});
  };

  return (
    <View style={commonStyles.container}>
      {/* <View style={styles.topBar}>
        <Text style={styles.buttonText}>Scanner</Text>
      </View> */}

      {/* When we have the cropped image, show the image, otherwise show camera output */}

      <View style={commonStyles.scanner}>
        {data.croppedImage ? (
          <Image
            source={{uri: data.croppedImage}}
            style={commonStyles.preview}
          />
        ) : (
          <DocScanner
            ref={docScannerElement}
            style={commonStyles.scanner}
            onPictureTaken={handleOnPictureTaken}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            quality={0.5}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
          />
        )}
      </View>

      {/* show retry button after taking picture, otherwise take picture button */}
      <View style={commonStyles.bottomBar}>
        {data.croppedImage ? (
          <>
            <CustomButton
              onPress={handleOnPressRetry}
              iconName="back"
              buttonStyles={commonStyles.button}
              iconStyles={commonStyles.buttonIcon}
            />
            <CustomButton
              onPress={handleOnCrop}
              iconName="crop"
              buttonStyles={commonStyles.button}
              iconStyles={commonStyles.buttonIcon}
            />
          </>
        ) : (
          <CustomButton
            onPress={handleOnPress}
            iconName="camera"
            buttonStyles={commonStyles.button}
            iconStyles={commonStyles.buttonIcon}
          />
        )}
      </View>
    </View>
  );
};

export default DocScan;
