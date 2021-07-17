import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {MMKV} from 'react-native-mmkv';

import CustomCrop from 'react-native-perspective-image-cropper';
import CustomButton from './CustomButton';
import styles from '../constants/commonStyles';

import FileNameModal from './FileNameModal';

const CropScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const textInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const customCropElement = useRef(null);
  //   const [data, setData] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rectangleCoordinates, setRectangleCoordinates] = useState({
    topLeft: {x: 20, y: 20},
    topRight: {x: 20, y: 20},
    bottomRight: {x: 20, y: 20},
    bottomLeft: {x: 20, y: 20},
  });

  const {data} = route.params;
  //   console.log(data);

  const updateImage = (croppedImage, newCoords) => {
    console.log(newCoords);
    setCroppedImage(croppedImage);
    setRectangleCoordinates(newCoords);
  };

  const handleOnCrop = () => {
    console.log('cropping pic');
    customCropElement.current.crop();
  };

  const handleOnReset = () => {
    setCroppedImage(null);
    setRectangleCoordinates({
      topLeft: {x: 20, y: 20},
      topRight: {x: 20, y: 20},
      bottomRight: {x: 20, y: 20},
      bottomLeft: {x: 20, y: 20},
    });
  };

  const handleOnSave = () => {
    setModalVisible(true);
    // get filename from user
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOnClose = () => {
    setModalVisible(false);
    setFileName(null);
  };

  const handleOnChangeText = text => {
    setFileName(text);
  };

  const handleOnSubmit = () => {
    console.log(fileName);
    setModalVisible(false);
    setFileName(null);
    // enter filename
    // save to local storage
    //? navigate to list of files scanned
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanner}>
        <FileNameModal
          visible={modalVisible}
          fileName={fileName}
          handleOnClose={handleOnClose}
          handleOnSubmit={handleOnSubmit}
          handleOnChangeText={handleOnChangeText}
          toggleModal={toggleModal}
        />

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
        <CustomButton
          onPress={handleOnReset}
          iconName="back-in-time"
          buttonStyles={styles.button}
          iconStyles={styles.buttonIcon}
        />
        {croppedImage ? (
          <CustomButton
            onPress={handleOnSave}
            iconName="save"
            buttonStyles={styles.button}
            iconStyles={styles.buttonIcon}
          />
        ) : (
          <CustomButton
            onPress={handleOnCrop}
            iconName="check"
            buttonStyles={styles.button}
            iconStyles={styles.buttonIcon}
          />
        )}
      </View>
    </View>
  );
};

const stylesTemp = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#2C2E43',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    // marginTop: 200,
    width: 300,
    padding: 30,
    justifyContent: 'space-around',
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'black',
  },
  textInput: {
    color: '#B2B1B9',
  },
});

export default CropScreen;
