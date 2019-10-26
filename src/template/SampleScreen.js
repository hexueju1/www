/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Alert, TouchableOpacity, FlatList, Image, StyleSheet, View, ScrollView } from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../components/BaseScreen'
import { color, size, layout, style } from '../common/MyStyle'
import { showToast, showLoading, hideLoading } from '../utils/MyToastUtils'
import CommonButton from '../components/CommonButton'
import { Isao, Sae, Kaede, Hoshi, Jiro, Akira, Madoka } from 'react-native-textinput-effects'
import Toast from '../components/toast/toast'
import { launchCamera } from '../utils/MyPhotoSelectUtils'
import { RNCamera } from 'react-native-camera'

export default class SampleScreen extends BaseScreen {
  static navigationOptions = {
    title: 'Sample',
  }

  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
      isModalVisible: false,
      cameraType: RNCamera.Constants.Type.back,
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  handlePress() {}

  showAlert = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    )
  }

  switchFront = () => {
    this.setState({ cameraType: RNCamera.Constants.Type.front })
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.log(data)
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <RNCamera
            ref={(ref) => {
              this.camera = ref
            }}
            style={styles.preview}
            type={this.state.cameraType}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.switchFront.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> switchFront </Text>
            </TouchableOpacity>
          </View>

          <Button
            full
            onPress={() => {
              launchCamera()
            }}
          >
            <Label style={{ color: color.white }}>showIOSLoading</Label>
          </Button>

          <Button
            full
            onPress={() => {
              showLoading(5, true)
            }}
          >
            <Label style={{ color: color.white }}>showLoadingForce</Label>
          </Button>

          <Button
            full
            onPress={() => {
              hideLoading()
            }}
          >
            <Label style={{ color: color.white }}>hideLoading</Label>
          </Button>

          <CommonButton
            style={{ fontSize: 20, color: 'white' }}
            containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: color.down }}
            onPress={() => this.showAlert()}
          >
            alert
          </CommonButton>
          <CommonButton
            style={{ fontSize: 20, color: 'white' }}
            styleDisabled={{ color: 'white' }}
            disabled={this.state.isDisabled}
            containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: color.up }}
            disabledContainerStyle={{ backgroundColor: color.pink }}
            onPress={() => this.handlePress()}
          >
            禁用
          </CommonButton>
          <Madoka
            style={styles.input}
            label={'Frequency'}
            borderColor={'#aee2c9'}
            labelStyle={{ color: '#008445' }}
            inputStyle={{ color: '#f4a197' }}
          />

          <Akira label={'First Name'} borderColor={'#a5d1cc'} labelStyle={{ color: '#ac83c4' }} />

          <Jiro style={styles.input} label={"Cat's name"} borderColor={'#f7c665'} inputStyle={{ color: 'white' }} />
          <Hoshi style={styles.input} label={'Street'} maskColor={'#F9F7F6'} borderColor={'#7ac1ba'} />
          <Kaede
            style={styles.input}
            label={'Number'}
            labelStyle={{
              color: 'white',
              backgroundColor: '#fcb794',
            }}
            inputStyle={{
              color: 'white',
              backgroundColor: '#db8d67',
            }}
            keyboardType="numeric"
          />

          <Isao
            label={'First Name'}
            // this is applied as active border and label color
            activeColor={'#da7071'}
            // active border height
            borderHeight={8}
            inputPadding={16}
            labelHeight={24}
            // this is applied as passive border and label color
            passiveColor={'#dadada'}
          />
          <Button title="Show modal" onPress={this.toggleModal} />
        </ScrollView>
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
    height: 300,
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
