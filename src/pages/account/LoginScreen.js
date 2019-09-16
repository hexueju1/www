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
import { black } from 'ansi-colors'
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
        {/* <ImageBackground style={{ height: 230, justifyContent: 'center', alignItems: 'center' }} source={require('../../images/img/loginbg1.jpg')}> */}
        <View style={{ height: size.login_height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: size.login_pic_width, height: size.login_pic_height }} source={require('../../images/png/login_pic.png')} />
          <Text style={styles.text}>登录</Text>
        </View>
        <View style={[styles.login]}>
          {/* <Item picker>
            <TextInput
              style={{ flex: 2, height: 50 }}
              placeholder={'account'}
              value={this.state.phone}
              keyboardType={'numeric'}
              onChangeText={(text) => this.setState({ phone: text })}
            />
          </Item> */}

          {/*  */}
          <ImageBackground source={require('../../images/login_background.png')} style={{ width: 328, height: 49 }}>
            <CountDownInput
              endpoint={endpoint.sms.send}
              placeholder={'请输入正确的手机号'}
              label={'获取验证码'}
              style={{ borderRadius: 8 }}
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
          </ImageBackground>

          <ImageBackground source={require('../../images/login_background.png')} style={{ width: 328, height: 49, marginTop: 32 }}>
            {/* <Item picker> */}
            <TextInput
              style={{ flex: 1, height: 50 }}
              placeholder={'请输入验证码'}
              value={this.state.phoneCode}
              // secureTextEntry={true}
              onChangeText={(text) => this.setState({ phoneCode: text })}
            />
            {/* </Item> */}
          </ImageBackground>
          <Button
            full
            style={{ backgroundColor: '#ffffff', marginTop: 45 }}
            onPress={() => {
              this.login()
            }}
          >
            <ImageBackground style={[styles.login_button]} source={require('../../images/login_button.png')}>
              <Text style={{ color: color.white,fontSize:25,lineHeight:49,textAlign:'center' }}>{'登录/注册'}</Text>
            </ImageBackground>
          </Button>
        </View>
        <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../images/login_bottom.png')} style={{ width: 145, height: 145 }}></Image>
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
    color: '#111111',
    fontSize: size.font_big_title,
  },
  login: {
    overflow: 'hidden',
    alignItems: 'center',
  },
  login_button: {
    width: 328,
    height: 49,
  },
})