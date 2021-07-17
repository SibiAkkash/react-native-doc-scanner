import React, {Text} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import commonStyles from '../constants/commonStyles';

const CustomButton = ({onPress, iconName, buttonStyles, iconStyles}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Icon name={iconName} size={30} color="#FFD523" style={iconStyles} />
    </TouchableOpacity>
  );
};

export default CustomButton;
