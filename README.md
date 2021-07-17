## Steps
* Clone the repo
* Download add the packages: `npm install --save`
* Link all native modules: `npx react-native link`

#### For all native modules change version numbers to the following
```
	buildToolsVersion = "29.0.3" 
	minSdkVersion = 21
	compileSdkVersion = 29 
	targetSdkVersion = 29
```
#### Update react-native-perspective-image-cropper: [error](https://stackoverflow.com/questions/64970241/react-native-error-animated-event-now-requires-a-second-argument-for-options)

* File to be updated: `/node_modules/react-native-perspective-image-cropper/index.js`
* In the function `createPanResponder()`, add `{useNativeDriver: false}` as an options object to `onPanResponderMove`

* Before
```
onPanResponderMove: Animated.event([
                null,
                {
                    dx: corner.x,
                    dy: corner.y,
                },
            ]),
```
* Changed code:
```
onPanResponderMove: Animated.event([
                null,
                {
                    dx: corner.x,
                    dy: corner.y,
                },
            ], {useNativeDriver: false}),
```

#### Run the app

* Connect a physical device to test the app
* Run metro: `npx react-native start`
* Android: 
  * `npx react-native run-android`
* iOS:
  * `react-native run-ios`



---
## Screenshots
