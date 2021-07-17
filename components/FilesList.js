import FileViewer from 'react-native-file-viewer';

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

const Item = ({file, onPress}) => {
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    padding: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  fileNameContainer: {
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
    fontWeight: 'bold',
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default FilesList;
