import * as RNFS from 'react-native-fs';

import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import FilesList from './FilesList';

const isValidFile = file => {
  const validFileExtensions = ['jpg', 'jpeg', 'png'];
  let extension = file.name.split('.').pop();
  return validFileExtensions.includes(extension);
};

const FileViewerScreen = props => {
  const [filesList, setFilesList] = useState({});
  //   const [doneFiltering, setDoneFiltering] = useState(false);

  useEffect(() => {
    async function readFiles() {
      try {
        const files = await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/`);
        let filteredFiles = files.filter(file => isValidFile(file));
        setFilesList(filteredFiles);
        // setDoneFiltering(true);
      } catch (err) {
        console.log(err.message, err.code);
      }
    }
    readFiles();
  }, []);

  return (
    <View style={styles.container}>
      {filesList ? <FilesList files={filesList} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FileViewerScreen;
