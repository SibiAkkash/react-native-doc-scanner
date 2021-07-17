import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import CustomButton from './CustomButton';
import commonStyles from '../constants/commonStyles';

const HomeScreen = ({route, navigation}) => {
  const MainButton = ({routeName, text, iconName}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        style={styles.button}>
        <Icon
          name={iconName}
          size={30}
          color="#1B1B1B"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DocScan</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton routeName="Scan" text="Scan files" iconName="camera" />
        <MainButton
          routeName="Files"
          text="View files"
          iconName="folder-images"
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
    // backgroundColor: '#B2B1B9',
    // backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: 350,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFD523',
    padding: 25,
    width: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonIcon: {
    paddingLeft: 5,
    paddingRight: 20,
  },
  buttonText: {
    color: '#2C2E43',
    fontSize: 24,
    marginLeft: 5,
    fontWeight: 'bold',
    // marginRight: 5,
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
