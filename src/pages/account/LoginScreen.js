/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { BackHandler, SafeAreaView, TextInput, FlatList, Image, StyleSheet, View, ImageBackground } from 'react-native'
import BaseScreen from '../../components/BaseScreen'
import { color, size, layout, style } from '../../common/MyStyle'
import { LOG, isDebug } from '../../utils/MyDebugUtils'
import DismissKeyboardView from '../../components/DismissKeyboardHOC'
import { Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import CountDownInput from '../../components/CountDownInput'
import { event, localStore, endpoint } from '../../common/Constants'
import { isEmail, isPhoneNumber, isPassword } from '../../utils/VerifyUtils'
import MyHttpUtils from '../../utils/MyHttpUtils'
import LoginManager from '../../common/LoginManager'
import { showToast } from '../../utils/MyToastUtils'
import MyStoreManager from '../../common/MyStoreManager'
export default class LoginScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      password: '',
      phoneCode: '',
    }
  }

  login = () => {
    MyHttpUtils.fetchRequest('post', endpoint.user.mobilelogin, {
      mobile: this.state.phone,
      captcha: this.state.phoneCode,
      applogin: '1',
    }).then((responseJson) => {
      showToast('登录成功')
      LoginManager.afterLogin(responseJson.data.userinfo, true)
      console.log('loginData', MyStoreManager.getData(localStore.userInfo))
      this.props.navigation.goBack()
    })
  }

  render() {
    return (
      <DismissKeyboardView style={styles.main_container}>
        <ImageBackground style={{ height: 230, justifyContent: 'center', alignItems: 'center' }} source={require('../../images/img/loginbg1.jpg')}>
          <Text style={styles.text}>闪贷</Text>
        </ImageBackground>
        <View style={{ overflow: 'hidden', marginHorizontal: 20, alignItems: 'center' }}>
          {/* <Item picker>
            <TextInput
              style={{ flex: 2, height: 50 }}
              placeholder={'account'}
              value={this.state.phone}
              keyboardType={'numeric'}
              onChangeText={(text) => this.setState({ phone: text })}
            />
          </Item> */}

          <CountDownInput
            endpoint={endpoint.sms.send}
            placeholder={'请输入手机号'}
            label={'获取验证码'}
            value={this.state.phone}
            keyboardType="numeric"
            httpParams={{
              event: 'mobilelogin',
              mobile: this.state.phone,
            }}
            onChangeText={(text) => this.setState({ phone: text })}
            onPress={() => {
              if (this.state.phone === '') {
                showToast('Eenter_Phone_Number')
                return
              }

              if (!isPhoneNumber(this.state.phone)) {
                showToast('Valid_Phone_Number')
                return
              }

              return true
            }}
          />

          <Item picker>
            <TextInput
              style={{ flex: 1, height: 50 }}
              placeholder={'请输入6位数字验证码'}
              value={this.state.phoneCode}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ phoneCode: text })}
            />
          </Item>

          <Button
            full
            style={{ backgroundColor: color.up, marginTop: 20 }}
            onPress={() => {
              this.login()
            }}
          >
            <Label style={{ color: color.white }}>{'登录/注册'}</Label>
          </Button>
        </View>
      </DismissKeyboardView>
    )
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: size.font_big_title,
  },
})
