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
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import { StackViewTransitionConfigs } from 'react-navigation'
import { hidden } from 'ansi-colors'
import LinearGradient from 'react-native-linear-gradient'
import Operator from '../../pages/operator/OperatorScreen'

export default class IDCardScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="身份认证" />
        {/* 身份认证文字内容 */}
        <View style={{ marginTop: px(45) }}>
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
          <Image style={styles.cameraStyle} source={images.camera} />
        </View>
        <Button
          full
          style={styles.buttonstyle}
          onPress={() => {
            this.props.navigation.navigate('Operator')
          }}
        >
          <Text style={{ color: color.white, fontSize: 16 }}>确定</Text>
        </Button>
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
    backgroundColor: '#E9ECEF',
  },
  textcontent: {
    alignSelf: 'center',
    color: '#0F0F0F',
    fontSize: sp(16),
  },
  idcardborder: {
    width: px(260),
    height: px(260),
    borderWidth: px(2),
    borderColor: '#22AAEF',
    paddingTop: px(7),
    position: 'absolute',
    top: px(190),
    left: '50%',
    marginLeft: px(-130),
  },
  topBorder: {
    position: 'absolute',
    top: px(-2),
    left: px(54),
    width: px(151),
    height: px(2),
    backgroundColor: '#E9ECEF',
  },
  bottomBorder: {
    position: 'absolute',
    top: px(256),
    left: px(54),
    width: px(151),
    height: px(3),
    backgroundColor: '#E9ECEF',
  },
  leftBorder: {
    position: 'absolute',
    left: px(-2),
    top: px(54),
    width: px(2),
    height: px(151),
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: px(256),
    top: px(54),
    width: px(2),
    height: px(151),
    backgroundColor: '#E9ECEF',
  },
  line: {
    width: px(256),
    height: px(2),
    backgroundColor: '#22AAEF',
    marginTop: px(120),
  },
  linear: {
    width: px(256),
    height: px(82),
  },
  buttonstyle: {
    width: px(300),
    height: px(40),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    marginTop: px(350),
    marginBottom: px(22),
    alignSelf: 'center',
  },
  cameraStyle: {
    width: px(98),
    height: px(98),
    position: 'relative',
    left: '50%',
    marginLeft: px(-49),
    marginTop: px(-135),
  },
  cardSample: {
    width: px(258),
    height: px(164),
    alignSelf: 'center',
  },
})
