import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Text,
} from 'react-native';

import CustomCrop from 'react-native-perspective-image-cropper';

const CropScreen = ({route, navigation}) => {
  const customCropElement = useRef(null);
  //   const [data, setData] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rectangleCoordinates, setRectangleCoordinates] = useState({
    topLeft: {x: 10, y: 10},
    topRight: {x: 10, y: 10},
    bottomRight: {x: 10, y: 10},
    bottomLeft: {x: 10, y: 10},
  });

  const {data} = route.params;
  //   console.log(data);

  const updateImage = (croppedImage, newCoords) => {
    console.log(newCoords);
    setCroppedImage(croppedImage);
    setRectangleCoordinates(newCoords);
  };

  const handleOnCrop = () => {
    customCropElement.current.crop();
  };

  return (
    <>
      {/* <View style={styles.scanner}>
        <Image source={{uri: data.initialImage}} style={styles.preview} />
      </View> */}

      <View style={styles.scanner}>
        {croppedImage ? (
          <Image
            style={styles.preview}
            source={{uri: `data:image/jpeg;base64,${croppedImage}`}}
          />
        ) : (
          <CustomCrop
            ref={customCropElement}
            style={styles.scanner}
            updateImage={updateImage}
            rectangeCoordinates={rectangleCoordinates}
            initialImage={data.initialImage}
            height={data.height}
            width={data.width}
            overlayColor="rgba(18, 190, 210, 1)"
            overlayStrokeColor="rgba(20, 190, 210, 1)"
            handlerColor="rgba(20, 150, 160, 1)"
            enablePanStrict={false}
          />
        )}
      </View>

      {/* Crop button */}
      <View style={styles.bottomBar}>
        <Button onPress={handleOnCrop} style={styles.button} title="Crop" />
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
    backgroundColor: 'black',
  },
  bottomBar: {
    flex: 1,
    backgroundColor: 'darkgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
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
    resizeMode: 'contain',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CropScreen;
