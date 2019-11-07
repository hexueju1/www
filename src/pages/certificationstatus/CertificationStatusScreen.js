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
  SafeAreaView,
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
import CountDownInput from '../../components/CountDownInput'

export default class CertificationStatusScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader
          text="身份验证"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
        <ScrollView>
          <View style={styles.content}>
            <Image style={styles.pic_suc} source={images.certification_suc} />
            <Text style={styles.textstyle}>恭喜您认证成功，即将跳转借款页面</Text>
          </View>
          {/* <View style={styles.content}>
            <Image style={styles.pic_fail} source={images.certification_fail} />
            <Text style={styles.textstyle}>未知状态</Text>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('BorrowConfirm')
    }, 1000)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.timer && clearTimeout(this.timer)
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F3F3F3',
  },
  content: {
    paddingTop: px(23),
  },
  pic_suc: {
    width: px(194),
    height: px(194),
    marginBottom: px(39),
    alignSelf: 'center',
  },
  pic_fail: {
    width: px(289),
    height: px(251),
    marginBottom: px(39),
    alignSelf: 'center',
  },
  textstyle: {
    color: '#302C48',
    fontSize: px(20),
    lineHeight: px(28),
    fontWeight: '400',
    alignSelf: 'center',
  },
})
