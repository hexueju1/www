'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  requireNativeComponent,
  Platform,
  Dimensions,
  ToastAndroid,
  BackHandler,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import { StackViewTransitionConfigs } from 'react-navigation'
import { hidden } from 'ansi-colors'
import LinearGradient from 'react-native-linear-gradient'

export default class IDCardScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="身份认证" />
        {/* 身份认证文字内容 */}
        <View style={{ marginTop: 45 }}>
          <Text style={styles.textcontent}>请正对手机，确保光线充足</Text>
        </View>
        {/* 本人照片 */}
        <View style={styles.idcardborder}>
          <View style={styles.topBorder}></View>
          <View style={styles.bottomBorder}></View>
          <View style={styles.leftBorder}></View>
          <View style={styles.rightBorder}></View>
          <View style={styles.line}></View>
          <LinearGradient style={styles.linear} colors={['#A6DAF2', '#E9ECEF']}></LinearGradient>
          <Image style={styles.cameraStyle} source={require('../../images/png/camera.png')} />
        </View>
        <Button
          full
          style={styles.buttonstyle}
          onPress={() => {
            this.props.navigation.navigate('PersonalPicture')
          }}
        >
          <Text style={{ color: color.white, fontSize: 16 }}>确定</Text>
        </Button>
      </SafeAreaView>
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
    backgroundColor: '#E9ECEF',
  },
  textcontent: {
    alignSelf: 'center',
    color: '#0F0F0F',
    fontSize: 16,
  },
  idcardborder: {
    width: 260,
    height: 260,
    borderWidth: 2,
    borderColor: '#22AAEF',
    paddingTop: 7,
    position: 'absolute',
    top: 190,
    left: '50%',
    marginLeft: -130,
  },
  topBorder: {
    position: 'absolute',
    top: -2,
    left: 54,
    width: 151,
    height: 2,
    backgroundColor: '#E9ECEF',
  },
  bottomBorder: {
    position: 'absolute',
    top: 256,
    left: 54,
    width: 151,
    height: 2,
    backgroundColor: '#E9ECEF',
  },
  leftBorder: {
    position: 'absolute',
    left: -2,
    top: 54,
    width: 2,
    height: 151,
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: 256,
    top: 54,
    width: 2,
    height: 151,
    backgroundColor: '#E9ECEF',
  },
  line: {
    width: 257,
    height: 2,
    backgroundColor: '#22AAEF',
    marginTop: 120,
  },
  linear: {
    width: 257,
    height: 82,
  },
  buttonstyle: {
    width: 300,
    height: 40,
    backgroundColor: '#ABABAB',
    borderRadius: 22,
    marginTop: 350,
    marginBottom: 22,
    alignSelf: 'center',
  },
  cameraStyle: {
    width: 98,
    height: 98,
    position: 'relative',
    left: '50%',
    marginLeft: -49,
    marginTop: -135,
  },
  cardSample: {
    width: 258,
    height: 164,
    alignSelf: 'center',
  },
})
