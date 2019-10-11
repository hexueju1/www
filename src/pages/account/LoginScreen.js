/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { BackHandler, TextInput, FlatList, Image, StyleSheet, View, ImageBackground } from 'react-native'
import BaseScreen from '../../components/BaseScreen'
import { color, size, layout, style } from '../../common/MyStyle'
import { LOG, isDebug } from '../../utils/MyDebugUtils'
import DismissKeyboardView from '../../components/DismissKeyboardHOC'
import { Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import CountDownInput from '../../components/CountDownInput'
import { event, localStore, endpoint, images } from '../../common/Constants'
import { isEmail, isPhoneNumber, isPassword } from '../../utils/VerifyUtils'
import MyHttpUtils from '../../utils/MyHttpUtils'
import LoginManager from '../../common/LoginManager'
import { showToast } from '../../utils/MyToastUtils'
import MyStoreManager from '../../common/MyStoreManager'
import { black } from 'ansi-colors'
import { px, sp } from '../../utils/Device'
import { styleType } from '../../common/MyStyle'

export default class LoginScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props)
    this.state = {
      phone: '18963985141',
      phoneCode: '123456',
      show: '',
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
      this.props.navigation.goBack()
    })
  }

  render() {
    let showContent =
      this.state.show == '1' ? <Image style={{ width: size.login_pic_width, height: size.login_pic_height }} source={images.login_pic} /> : null
    return (
      <DismissKeyboardView style={styles.main_container}>
        {/* <ImageBackground style={{ height: 230, justifyContent: 'center', alignItems: 'center' }} source={require('../../images/img/loginbg1.jpg')}> */}
        <View style={{ height: size.login_height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Image style={{ width: size.login_pic_width, height: size.login_pic_height }} source={images.login_pic} /> */}
          {showContent}
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
          <ImageBackground source={images.login_background} style={{ width: px(328), height: px(49) }}>
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

          <ImageBackground source={images.login_background} style={{ width: px(328), height: px(49), marginTop: px(32) }}>
            {/* <Item picker> */}
            <TextInput
              style={{ flex: 1, height: px(50), paddingLeft: px(36), color: '#ffffff' }}
              placeholder={'请输入验证码'}
              placeholderTextColor={'#fdfdfd'}
              value={this.state.phoneCode}
              // secureTextEntry={true}
              onChangeText={(text) => this.setState({ phoneCode: text })}
            />
            {/* </Item> */}
          </ImageBackground>
          <Button
            full
            style={{ backgroundColor: '#ffffff', marginTop: px(45) }}
            onPress={() => {
              this.login()
            }}
          >
            <ImageBackground style={[styles.login_button]} source={images.login_button}>
              <Text style={{ color: color.white, fontSize: sp(25), lineHeight: px(49), textAlign: 'center' }}>{'登录/注册'}</Text>
            </ImageBackground>
          </Button>
        </View>
        <View style={{ marginTop: px(50), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={images.login_bottom} style={{ width: px(145), height: px(145) }}></Image>
        </View>
      </DismissKeyboardView>
    )
  }

  componentDidMount() {
    if (styleType == 1) {
      this.setState({ show: '1' })
    }
  }

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
    width: px(330),
    height: px(49.5),
  },
})
