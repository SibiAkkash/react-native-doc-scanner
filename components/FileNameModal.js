import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {Input} from 'react-native-elements';
import CustomButton from './CustomButton';
import styles from '../constants/commonStyles';

const FileNameModal = ({
  visible,
  fileName,
  handleOnClose,
  handleOnSubmit,
  handleOnChangeText,
  toggleModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={stylesTemp.outerContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={stylesTemp.inner}>
            <Input
              placeholder="Filename"
              style={stylesTemp.textInput}
              value={fileName}
              onChangeText={handleOnChangeText}
            />
            <View style={stylesTemp.buttonContainer}>
              <CustomButton
                onPress={handleOnClose}
                iconName="back"
                buttonStyles={styles.button}
                iconStyles={styles.buttonIcon}
              />
              <CustomButton
                onPress={handleOnSubmit}
                iconName="save"
                buttonStyles={styles.button}
                iconStyles={styles.buttonIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
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

export default FileNameModal;
