import * as React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Text, Icon } from 'native-base'
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import { Camera, BarCodeScanningResult } from 'expo-camera'

import { Audio } from 'expo-av';
import { getPermissionsAsync } from 'expo-av/build/Audio';

const Colors = {
  red: '#DF0024',
  lightBlack: '#231F20',
  black: '#000',
  white: '#FFF'
};

interface Props {
  handleScan: (number: string) => void
}

export default function BarcodeScreen(props: Props) {
  const [hasCameraPermission, setCameraPermission] = React.useState(false)
  const [enabled, setEnabled] = React.useState(false)
  const [autoFocus, setAutoFocus] = React.useState(Camera.Constants.AutoFocus.off)
  const [flashEnabled, setFlashEnabled] = React.useState(false)
  const [flashMode, setFlashMode] = React.useState(Camera.Constants.AutoFocus.off)
  const [enableFlash, setEnableFlash] = React.useState(false)

  const camera = React.useRef<Camera>(null);

  React.useEffect(() => {
    getPermissionsAsync()
  }, []);

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(status === 'granted');
  };

  const toggleFlash = () => {
    setEnableFlash(!enableFlash)
  }

  const stripNumber = (data: string) => {
    return data.split(' ').join('')
  }

  const handleBarCodeScanned = async ({ type, data }: BarCodeScanningResult) => {
    await beep()
    setEnabled(false)
    setEnableFlash(false)
    props.handleScan(stripNumber(data))
  };

  const beep = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/beep.wav'));
      await soundObject.playAsync();
    } catch (error) {
    }
  }

  //ratio of camera 
  const cameraHeight = 0.5
  const isRatio = true

  //All of these calculations is for android.     
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  const headerHeight = Platform.OS === 'ios' ? 64 : 56
  const androidCameraRatio = (4 / 3)

  const cameraContainerHeight = isRatio
    ? Math.round((screenHeight - headerHeight) * cameraHeight)
    : cameraHeight;

  const cameraHeightPercent = Math.round((screenWidth / cameraContainerHeight) * androidCameraRatio * 100)
  const cameraHeightPixels = screenWidth * androidCameraRatio
  const marginTop = (cameraHeightPixels - cameraContainerHeight) / 2 * -1

  const styles = StyleSheet.create({
    camera: {
      marginHorizontal: 0, marginLeft: 0, marginStart: 0,
      paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
      height: `${cameraHeightPercent}%`,
      marginTop: marginTop,
      padding: 0
    },
    barcodeContainer: {
      height: cameraContainerHeight,
      overflow: 'hidden'
    },
    noBarcodeContainer: {
      height: cameraContainerHeight,
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    noBarcodeButton: {
    },
    button: {
      borderRadius: 0,
      width: 200,
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });


  if (hasCameraPermission === null) {
    return (
      <View style={[styles.noBarcodeContainer]}>
        <Text>Demande d'accès à la caméra.</Text>
      </View>
    );
  }
  if (hasCameraPermission === false) {
    return (
      <View style={[styles.noBarcodeContainer]}>
        <Text>Aucun accès à la caméra.</Text>
      </View>
    );
  }
  const barcodePng = 'data:image/gif;base64,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IEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAIAg4Q8AAAAAgoQ/AAAAAAgS/gAAAAAgSPgDAAAAgCDhDwAAAACChD8AAAAACBL+AAAAACBI+AMAAACAIOEPAAAAAIKEPwAAAAAIEv4AAAAAIEj4AwAAAICg/wPlKFmWU0L9XgAAAABJRU5ErkJggg=='

  return (
    <TouchableOpacity onPress={() => setEnabled(false)} style={[styles.barcodeContainer]}>
      <ImageBackground
        resizeMode={'cover'}
        source={{ uri: barcodePng }}
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        imageStyle={{ opacity: 0.3 }}>

        <Button light style={[styles.noBarcodeButton, styles.button]}
          onPress={() => setEnabled(true)}>
          <Text>NUMÉRISER</Text>
        </Button>
      </ImageBackground>
      {enabled ?

        <Camera
          ref={camera}
          onCameraReady={() => {

            const c = camera.current
            if (!c) return
            //c.flashMode = Camera.Constants.FlashMode.torch
          }}
          flashMode={flashEnabled ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
          onBarCodeScanned={enabled ? handleBarCodeScanned : undefined}
          style={[StyleSheet.absoluteFillObject, styles.camera]}
        >
          <View style={{
            width: '100%', height: 44, alignItems: 'flex-start',
            flex: 1,
            position:
              'absolute',

            margin: 2,
            marginTop: Math.abs(marginTop)
          }}>
            <View style={{ alignSelf: 'center', borderColor: Colors.red, width: 100, height: 100, borderWidth: 3, marginTop: Math.round(cameraContainerHeight / 2) - 50 }}></View>
          </View>
          <View style={{
            width: '100%', height: 44, alignItems: 'flex-start',
            flex: 1,
            position:
              'absolute',

            margin: 2,
            marginTop: Math.abs(marginTop)
          }}>
            <Button
              light
              style={{ width: 40, height: 40, marginTop: cameraContainerHeight - 44, marginRight: 4, alignSelf: 'flex-end' }}
              onPress={() => setFlashEnabled(!flashEnabled)} >
              <Icon name='flashlight' />
            </Button>
          </View>
        </Camera>

        : null}
    </TouchableOpacity>
  )

}