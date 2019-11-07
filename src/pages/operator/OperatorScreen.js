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
      phoneCode: '',
    }
  }
  allow_pic = () => {
    this.setState({ allow_status: !this.state.allow_status })
    this.setState({ button_status: !this.state.button_status })
  }

  upda = () => {
    showLoading(60, true)
    // 点击确定
    //已填写好服务密码与动态密码
    MyHttpUtils.fetchRequest('post', endpoint.risk.huanchen, { captcha: this.state.move, step: 'append' }).then((responseJson) => {
      console.log(1)
      if (responseJson.data == true) {
        //获取爬虫状态，五秒轮询一次
        this.interval = setInterval(() => {
          MyHttpUtils.fetchRequest('post', endpoint.risk.huanchen, { step: 'status' }).then((responseJson) => {
            console.log(2)
            if (responseJson.data == true) {
              //返回成功后，清除轮询，并页面跳转
              this.interval && clearInterval(this.interval)
              MyHttpUtils.fetchRequest('post', endpoint.risk.huanchen, { step: 'result' }).then((responseJson) => {
                console.log(3)
                if (responseJson.data == true) {
                  hideLoading()
                  MyHttpUtils.fetchRequest('post', endpoint.user.checkAuthentication).then((responseJson) => {
                    console.log(4)
                    let url = ''
                    // 0 需进行人证核验 1 需进行运营商认证 2 无需认证  3 bank
                    if (responseJson.data.state == 0) {
                      url = 'IDCard'
                    } else if (responseJson.data.state == 1) {
                      url = 'Operator'
                    } else if (responseJson.data.state == 2) {
                      url = 'BorrowConfirm'
                    } else if (responseJson.data.state == 3) {
                      url = 'BankCard'
                    }
                    if (url != '') {
                      this.props.navigation.navigate(url)
                      // this.props.navigation.replace(url)
                    } else {
                      showToast('非法状态')
                    }
                  })
                } else {
                  hideLoading()
                  this.interval && clearInterval(this.interval)
                  showToast(responseJson.data)
                }
              })
            }
          })
        }, 5000)
      } else {
        hideLoading()
        this.interval && clearInterval(this.interval)
        showToast(responseJson.data)
      }
    })
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
            endpoint={endpoint.risk.huanchen}
            style={{ borderBottomColor: '#000000' }}
            placeholder={'请输入动态密码'}
            placeholderTextColor={'#ABABAB'}
            label={'获取密码'}
            labelColor={'#E7912D'}
            value={this.state.move}
            keyboardType="numeric"
            httpParams={{
              password: this.state.phoneCode,
              step: 'create',
            }}
            onChangeText={(text) => this.setState({ move: text })}
            onPress={() => {
              if (this.state.phoneCode == '') {
                showToast('服务密码不能为空')
              } else {
                return true
              }
            }}
            on
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
              this.props.navigation.navigate('PermissionOperator')
            }}
          >
            <Text style={{ color: '#666666', fontSize: sp(12) }}>《用户信息收集授权协议》</Text>
          </TouchableOpacity>
        </View>
        <Button
          disabled={this.state.button_status}
          style={[styles.button, { backgroundColor: this.state.allow_status === false ? '#ABABAB' : '#E7912D' }]}
          onPress={() => this.upda()}
        >
          <Text style={{ fontSize: px(16) }}>确认</Text>
        </Button>
        <View style={{ marginLeft: px(41), marginTop: px(27) }}>
          <Text style={{ color: '#E7912D', fontSize: sp(13) }}>动态密码获取时间较长，请谨慎填写</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>如果忘记您的服务密码</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>移动用户：请联系10086进行咨询</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>联通用户：请联系10010进行咨询</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(10), marginTop: px(11) }}>电信用户：请联系10000进行咨询</Text>
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.user.detail).then((responseJson) => {
      this.setState({
        tel: responseJson.data.mobile,
      })
    })
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    hideLoading()
    this.interval && clearInterval(this.interval)
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
