import FileViewer from 'react-native-file-viewer';
import * as RNFS from 'react-native-fs';

import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import {FAB} from 'react-native-elements';

const Item = ({file, onPress}) => {
  //   console.log(file.item.path);
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{uri: `file://${file.item.path}`}}
        style={styles.imageThumb}
      />
      <View style={styles.fileNameContainer}>
        <Text style={styles.fileName}>{file.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const openFile = ({name, path}) => {
  console.log(name, path);
  FileViewer.open(path)
    .then(() => console.log('opened image'))
    .catch(err => console.log(err));
};

const FilesList = ({files}) => {
  const renderItem = file => {
    // let {name, path, size} = file.item;
    return <Item file={file} onPress={() => openFile(file.item)} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={file => file.name}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'white',
    margin: 12,
    padding: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    // margin: 1,
    // backgroundColor: '#B2B1B9',
    // padding: 5,
    // paddingHorizontal: 6,
    // paddingVertical: 5,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  fileNameContainer: {
    // marginTop: 5,
    // padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2E43',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  fileName: {
    margin: 5,
    padding: 5,
    color: '#FFD523',
    fontSize: 16,
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // backgroundColor: 'white',
  },
});

export default FilesList;
