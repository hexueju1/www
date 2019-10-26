/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Alert, TouchableOpacity, FlatList, Image, StyleSheet, View, ScrollView } from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { color, size, layout, style } from '../../common/MyStyle'
import { RNCamera } from 'react-native-camera'
import TabHeader from '../../common/TabHeader'

export default class MyCameraScreen extends BaseScreen {
  callback = null
  constructor(props) {
    super(props)
    this.callback = this.props.navigation.getParam('callback')
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
    }
  }

  switchCameraType = () => {
    if (this.state.cameraType == RNCamera.Constants.Type.back) {
      this.setState({ cameraType: RNCamera.Constants.Type.front })
    } else {
      this.setState({ cameraType: RNCamera.Constants.Type.back })
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true }
      const data = await this.camera.takePictureAsync(options)
      for (let [key, value] of Object.entries(data)) {
        console.log(key + ':' + value)
      }
      this.callback({ uri: data.uri }, this.state.cameraType == RNCamera.Constants.Type.back ? 2 : 1)
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="拍照" />
        <RNCamera
          ref={(ref) => {
            this.camera = ref
          }}
          style={styles.preview}
          type={this.state.cameraType}
          // flashMode={RNCamera.Constants.FlashMode.on}
          // androidCameraPermissionOptions={{
          //   title: 'App需要使用相机权限',
          //   message: 'We need your permission to use your camera',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes)
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> 拍照 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.switchCameraType.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> 切换前后摄像头 </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    width: size.screen_width,
    height: size.screen_height,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})
