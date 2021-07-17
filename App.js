import React from 'react';
import {useColorScheme, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import DocScanScreen from './components/DocScanScreen';
import CropScreen from './components/CropScreen';
import FileViewerScreen from './components/FileViewerScreen';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={DocScanScreen} />
        <Stack.Screen name="Crop" component={CropScreen} />
        <Stack.Screen
          name="Files"
          component={FileViewerScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon
                  name="home"
                  size={24}
                  color="white"
                  style={{marginRight: 20, marginTop: 3, alignSelf: 'center'}}
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
