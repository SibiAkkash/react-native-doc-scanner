
#### For all native modules change version numbers to the following
```
	buildToolsVersion = "29.0.3" 
	minSdkVersion = 21
	compileSdkVersion = 29 
	targetSdkVersion = 29
```

#### Update react-native-perspective-image-cropper: [error](https://stackoverflow.com/questions/64970241/react-native-error-animated-event-now-requires-a-second-argument-for-options)

* Error: `Animated.event now requires a second argument for options`   
add `{useNativeDriver: false}` to 
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

---
* Splitting modal into different component fixed the re-rendering
* 

### Todo
* add splash screen
* remove preview image from docScan screen