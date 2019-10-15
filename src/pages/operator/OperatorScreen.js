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
import { showToast, showLoading, hideLoading } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import CountDownInput from '../../components/CountDownInput'

export default class OperatorScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      // operator: '中国移动',
      tel: '18816236937',
      text: '123456',
      allow_status: false,
      button_status: true,
      move: '',
    }
  }
  allow_pic = () => {
    this.setState({ allow_status: !this.state.allow_status })
    this.setState({ button_status: !this.state.button_status })
  }

  getCode = () => {
    showLoading('11111')
    setTimeout(()=>hideLoading(),1000)
    
  }

  upda = () => {
    MyHttpUtils.fetchRequest('post', endpoint.collect.collectgethc, {})
  }
  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader
          text="运行商认证"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
        {/* 顶部文字 */}
        <View style={styles.toptext}>
          {/* <View style={styles.text_one}>
            <Text style={styles.textstyle}>运营商</Text>
            <Text style={styles.textstyle_right}>{this.state.operator}</Text>
          </View> */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>电话</Text>
            <Text style={styles.textstyle_right}>{this.state.tel}</Text>
          </View>
        </View>
        {/* 服务密码框 */}
        <TextInput
          style={styles.textinput}
          placeholderTextColor={'#ABABAB'}
          placeholder="请输入服务密码"
          keyboardType="numeric"
          onChangeText={(text) => this.setState({ phoneCode: text })}
        />
        {/* 动态密码 */}
        <View style={styles.countdowninput}>
          <CountDownInput
            // endpoint={endpoint.sms.send}
            style={{ borderBottomColor: '#000000' }}
            placeholder={'请输入动态密码'}
            placeholderTextColor={'#ABABAB'}
            label={'获取密码'}
            labelColor={'#E7912D'}
            value={this.state.move}
            keyboardType="numeric"
            httpParams={{
              event: 'mobilelogin',
              mobile: this.state.phone,
            }}
            onChangeText={(text) => this.setState({ move: text })}
            onPress={() => this.getCode()}
          />
        </View>
        {/* 协议阅读选择 */}
        <View style={styles.permission}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.allow_pic()}>
            <Image
              source={this.state.allow_status === false ? images.unallow : images.allow}
              style={{ width: px(16), height: px(16), marginRight: px(6) }}
            />
            <Text style={{ color: '#C6C9CC', fontSize: sp(12) }}>我已阅读并同意</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showToast('协议')
            }}
          >
            <Text style={{ color: '#666666', fontSize: sp(12) }}>《用户信息手机授权协议》</Text>
          </TouchableOpacity>
        </View>
        <Button
          disabled={this.state.button_status}
          style={[styles.button, { backgroundColor: this.state.allow_status === false ? '#ABABAB' : '#E7912D' }]}
          onPress={
            () => this.upda()
            // this.props.navigation.navigate('BankCard')
          }
        >
          <Text style={{ fontSize: px(16) }}>确认</Text>
        </Button>
        <View style={{ marginLeft: px(41), marginTop: px(27) }}>
          <Text style={{ color: '#ABABAB', fontSize: sp(10) }}>如果忘记您的服务密码</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>移动用户：请联系10086进行咨询</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>联通用户：请联系10010进行咨询</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>电信用户：请联系10000进行咨询</Text>
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.user.userinfo).then((responseJson) => {
      this.setState({
        tel: responseJson.data.userinfo.mobile,
      })
    })
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
  toptext: {
    marginHorizontal: px(20),
    marginTop: px(32),
    height: px(45),
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
    color: '#ABABAB',
    flex: 1,
  },
  textstyle_right: {
    fontSize: px(14),
    alignContent: 'flex-end',
    color: '#ABABAB',
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
  permission: {
    marginHorizontal: px(20),
    height: px(20),
    flexDirection: 'row',
    paddingLeft: px(10),
    alignItems: 'center',
  },
  button: {
    marginTop: px(33),
    width: px(300),
    height: px(44),
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  countdowninput: {
    marginHorizontal: px(20),
    width: px(334),
    height: px(50),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    borderWidth: px(1),
    borderColor: '#ABABAB',
    marginTop: px(16),
    marginBottom: px(16),
  },
})
