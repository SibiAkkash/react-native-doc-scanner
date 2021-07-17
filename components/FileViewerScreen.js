import * as RNFS from 'react-native-fs';

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Button,
} from 'react-native';
import FilesList from './FilesList';

const isValidFile = file => {
  const validFileExtensions = ['jpg', 'jpeg', 'png'];
  let extension = file.name.split('.').pop();
  return validFileExtensions.includes(extension);
};

const uploadFile = async (fileName, path) => {
  return;
  const imgPath = `file://${RNFS.DocumentDirectoryPath}/${fileName}.jpg`;

  const MY_API_KEY = 'A3jtQr5iFTjW8AX9YgeLZz';
  const uploadURL = `https://www.filestackapi.com/api/store/S3?key=${MY_API_KEY}`;

  console.log('uploading files...');

  const response = await fetch(uploadURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    body: imgPath,
  });

  if (response.status == 200) {
    // console.log('uploaded file');
    console.log(response);
  }
};

const LatestFile = ({fileName, path}) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Image source={{uri: `file://${path}`}} style={styles.imageThumb} />
      <View style={styles.fileNameContainer}>
        <Text style={styles.fileName}>{`${fileName}.jpg`}</Text>
        <Button title="Upload" onPress={() => uploadFile(fileName, path)} />
      </View>
    </TouchableOpacity>
  );
};

const FileViewerScreen = ({route, navigation}) => {
  const [filesList, setFilesList] = useState({});

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
      {route.params && (
        <LatestFile fileName={route.params.fileName} path={route.params.path} />
      )}
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
  item: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#B2B1B9',
    // padding: 10,
    // paddingHorizontal: 6,
    // paddingVertical: 5,
    marginTop: 20,
    marginHorizontal: 34,
  },
  fileNameContainer: {
    flex: 1,
    // marginTop: 5,
    // padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2E43',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
  },
  fileName: {
    margin: 5,
    padding: 5,
    color: '#FFD523',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 170,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    // backgroundColor: 'white',
  },
});

export default FileViewerScreen;
