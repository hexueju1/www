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

export default class VerificationScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      tel: '',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="运行商认证" />
        {/* 动态密码框 */}
        <View style={styles.countdowninput}>
          <CountDownInput
            // endpoint={endpoint.sms.send}
            placeholder={'请输入动态密码'}
            placeholderTextColor={'#ABABAB'}
            label={'获取密码'}
            labelColor={'#E7912D'}
            value={this.state.tel}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ tel: text })}
            onPress={() => {
              showToast('获取密码')
            }}
          />
        </View>
        <Button
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('BankCard')
          }}
        >
          <Text style={{ fontSize: px(16) }}>确认</Text>
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
  textinput: {
    marginHorizontal: px(20),
    marginTop: px(18),
    height: px(44),
    borderWidth: px(1),
    borderColor: '#ABABAB',
    marginBottom: px(8),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    paddingLeft: px(18),
  },
  button: {
    marginTop: px(33),
    width: px(300),
    height: px(44),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  countdowninput: {
    marginHorizontal: px(20),
    width: px(334),
    height: px(44),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    borderWidth: px(1),
    borderColor: '#ABABAB',
    marginTop: px(30),
  },
})
