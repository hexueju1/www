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

export default class OperatorScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      name: '某某',
      idcard: '请输入正确的银行卡号',
      bank: '',
      tel: '',
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="绑定银行卡" />
        <View style={[styles.toptext, { marginTop: px(32) }]}>
          {/* 持卡人 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>持卡人</Text>
            <Text style={[styles.textstyle_right, { color: '#0F0F0F' }]}>{this.state.name}</Text>
          </View>

          {/* 银行卡 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>银行卡</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {
                showToast('绑定银行卡')
              }}
            >
              <Text style={styles.textstyle_right}>{this.state.idcard}</Text>
              <Image style={{ width: px(13), height: px(11), alignSelf: 'center' }} source={images.bank_camera} />
            </TouchableOpacity>
          </View>

          {/* 所属银行 */}
          <View style={[styles.text_one, { borderColor: '#F3F3F3' }]}>
            <Text style={styles.textstyle}>所属银行</Text>
            <Text style={styles.textstyle_right}>{this.state.bank}</Text>
          </View>
        </View>

        <View style={[styles.toptext, { marginTop: px(10), height: px(90) }]}>
          {/* 预留号码 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>预留手机号</Text>
            {/* <Text style={styles.textstyle_right}>{this.state.tel}</Text> */}
            <TextInput placeholder={'预留号码'} placeholderTextColor={'#ABABAB'} />
          </View>

          {/* 验证码 */}
          <View style={{ marginLeft: px(-18) }}>
            <CountDownInput
              endpoint={endpoint.sms.send}
              style={{ borderBottomColor: '#F3F3F3' }}
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
    backgroundColor: '#F3F3F3',
  },
  toptext: {
    marginHorizontal: px(20),
    height: px(132),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
  },
  text_one: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px(45),
    borderBottomWidth: px(1),
    borderColor: '#E9ECEF',
    paddingLeft: px(16),
    paddingRight: px(6),
  },
  textstyle: {
    fontSize: px(14),
    color: '#0F0F0F',
    flex: 1,
  },
  textstyle_right: {
    fontSize: px(14),
    alignContent: 'flex-end',
    color: '#ABABAB',
  },
  button: {
    width: px(300),
    height: px(44),
    backgroundColor: '#ABABAB',
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: px(43),
  },
})
