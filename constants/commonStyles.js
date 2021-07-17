import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 100,
  },

  scanner: {
    flex: 6,
    backgroundColor: 'skyblue',
    aspectRatio: 2 / 3,
  },
  bottomBar: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#2C2E43',
    padding: 15,
    borderRadius: 10,
  },
  buttonIcon: {
    paddingHorizontal: 5,
  },
  buttonText: {
    color: '#FFD523',
    fontSize: 20,
  },
  preview: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 2 / 3,
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default commonStyles;
