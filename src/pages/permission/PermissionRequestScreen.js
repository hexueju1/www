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

export default class MyMsgScreen extends BaseScreen {
  static navigationOptions = {
    title: '协议',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  agree = () => {
    MyHttpUtils.fetchRequest('post', endpoint.user.checkAuthentication).then((responseJson) => {
      let url = ''
      // 0 需进行人证核验 1 需进行运营商认证 2 无需认证  3 bank
      if (responseJson.data.state == 0) {
        url = 'IDCard'
      } else if (responseJson.data.state == 1) {
        url = 'OperatorVerify'
      } else if (responseJson.data.state == 2) {
        url = 'BorrowConfirm'
      } else if (responseJson.data.state == 3) {
        url = 'BindBank'
      }
      if (url != '') {
        this.props.navigation.navigate(url)
      } else {
        showToast('非法状态')
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar backgroundColor={color.primary_bg} barStyle="dark-content" translucent={false} />
        <View>
          <Button
            full
            style={{
              borderRadius: px(4),
            }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Text style={{ color: color.white }}>拒绝</Text>
          </Button>
          <Button
            full
            style={{
              borderRadius: px(4),
            }}
            onPress={() => {
              this.agree()
            }}
          >
            <Text style={{ color: color.white }}>同意</Text>
          </Button>
        </View>
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
  },
})
