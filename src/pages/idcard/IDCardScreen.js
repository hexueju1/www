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
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import { StackViewTransitionConfigs } from 'react-navigation'
import { hidden } from 'ansi-colors'

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
        <View style={{ marginTop: px(45) }}>
          <Text style={styles.textcontent}>请确保本人身份证</Text>
          <Text style={styles.textcontent}>请正对拍摄头，确保图片清晰、文字清晰。</Text>
        </View>
        {/* 身份证图片 */}
        <View style={styles.idcardborder}>
          <View style={styles.topBorder}></View>
          <View style={styles.bottomBorder}></View>
          <View style={styles.leftBorder}></View>
          <View style={styles.rightBorder}></View>
          <Image style={styles.cardSample} source={images.idcard_sample} />
          <Image style={styles.cameraStyle} source={images.camera} />
        </View>
        <Button
          full
          style={styles.buttonstyle}
          onPress={() => {
            this.props.navigation.navigate('PersonalPicture')
          }}
        >
          <Text style={{ color: color.white, fontSize: sp(16) }}>确定</Text>
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
    fontSize: sp(16),
  },
  idcardborder: {
    width: px(260),
    height: px(180),
    borderWidth: px(2),
    borderColor: '#ABABAB',
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
    top: px(176),
    left: px(54),
    width: px(151),
    height: px(2),
    backgroundColor: '#E9ECEF',
  },
  leftBorder: {
    position: 'absolute',
    left: px(-2),
    top: px(54),
    width: px(2),
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  rightBorder: {
    position: 'absolute',
    left: px(256),
    top: px(54),
    width: px(2),
    height: px(70),
    backgroundColor: '#E9ECEF',
  },
  buttonstyle: {
    width: px(300),
    height: px(40),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    marginTop: px(264),
    marginBottom: px(22),
    alignSelf: 'center',
  },
  cameraStyle: {
    width: px(98),
    height: px(98),
    position: 'relative',
    left: '50%',
    marginLeft: px(-49),
    top: '-50%',
    marginTop: px(-49),
  },
  cardSample: {
    width: px(258),
    height: px(164),
    alignSelf: 'center',
  },
})
