import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';

import CustomButton from './CustomButton';
import commonStyles from '../constants/commonStyles';
import Icon from 'react-native-vector-icons/Entypo';

const HomeScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DocScan</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.navigate('Scan')}
          iconName="camera"
          buttonStyles={commonStyles.button}
          iconStyles={commonStyles.buttonIcon}
        />
        <CustomButton
          onPress={() => navigation.navigate('Files')}
          iconName="folder-images"
          buttonStyles={commonStyles.button}
          iconStyles={commonStyles.buttonIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFD523',
    fontSize: 24,
    marginLeft: 5,
  },
  header: {
    flex: 1,
    backgroundColor: '#52057B',
    position: 'absolute',
    top: 50,
    borderRadius: 10,
  },
  headerText: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontSize: 48,
    color: '#BC6FF1',
  },
});

export default HomeScreen;
