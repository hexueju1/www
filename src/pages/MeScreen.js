/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { TouchableHighlight, ScrollView, DeviceEventEmitter, SafeAreaView, Image, StyleSheet, Text, View, Alert, ImageBackground } from 'react-native'
import BaseScreen from '../components/BaseScreen'
import { color, size, layout, style } from '../common/MyStyle'
import { event, localStore } from '../common/Constants'
import LoginManager from '../common/LoginManager'
import { isDebug } from '../utils/MyDebugUtils'
import SettingItem from '../components/SettingItem'
import SettingItemBigPic from '../components/SettingItemBigPic'
import SettingItemTextTopDown from '../components/SettingItemTextTopDown'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { showToast } from '../utils/MyToastUtils'
import MyStoreManager from '../common/MyStoreManager'
import { Label, Button } from 'native-base'

export default class MeScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../images/img/loginbg2.jpg')}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (LoginManager.isLogin()) {
              } else {
                this.props.navigation.navigate('Login')
              }
              console.log('islogin', LoginManager.isLogin())
            }}
          >
            {/* <Text style={styles.buttonText}>{LoginManager.isLogin() : '登录/注册'}</Text> */}
          </TouchableOpacity>
        </ImageBackground>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <SettingItemBigPic
                imageUrl={require('../images/tabbar/personal.png')}
                text={'我的借款'}
                onPress={() => {
                  if (LoginManager.isLogin()) {
                  } else {
                    this.props.navigation.navigate('Login')
                  }
                }}
              />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <SettingItemBigPic
                imageUrl={require('../images/tabbar/personal.png')}
                text={'客服'}
                onPress={() => {
                  if (LoginManager.isLogin()) {
                  } else {
                    this.props.navigation.navigate('Login')
                  }
                }}
              />
            </View>
          </View>
          <View style={{ height: 20, backgroundColor: color.divide_line }} />
          <SettingItem
            imageUrl={require('../images/png/message.png')}
            text={'我的消息'}
            onPress={() => {
              if (LoginManager.isLogin()) {
              } else {
                this.props.navigation.navigate('Login')
              }
            }}
          />
          <SettingItem
            imageUrl={require('../images/png/coupon.png')}
            text={'更换银行卡'}
            onPress={() => {
              if (LoginManager.isLogin()) {
              } else {
                this.props.navigation.navigate('Login')
              }
            }}
          />
          <SettingItem
            imageUrl={require('../images/png/compass.png')}
            text={'借款指南'}
            onPress={() => {
              if (LoginManager.isLogin()) {
              } else {
                this.props.navigation.navigate('Login')
              }
            }}
          />
          <SettingItem
            imageUrl={require('../images/png/about.png')}
            text={'关于我们'}
            onPress={() => {
              if (LoginManager.isLogin()) {
                this.props.navigation.navigate('Account')
              } else {
                this.props.navigation.navigate('Login')
              }
            }}
          />

          {isDebug() ? (
            <SettingItem
              text="Sample(Debug)"
              onPress={() => {
                this.props.navigation.navigate('Sample')
              }}
            />
          ) : null}
          {LoginManager.isLogin() ? (
            <Button
              full
              style={{ backgroundColor: color.up, marginTop: 20 }}
              onPress={() => {
                showToast('注销登录')
              }}
            >
              <Label style={{ color: color.white }}>注销登录</Label>
            </Button>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    )
  }

  showAlert = () => {
    Alert.alert(
      '',
      '确认退出吗',
      [{ text: 'quxiao', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, { text: 'sure', onPress: () => LoginManager.logout() }],
      { cancelable: false },
    )
  }

  componentDidMount() {
    let that = this
  }

  componentWillUnmount() {}
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 20,
    borderColor: color.white,
    borderWidth: 1,
    backgroundColor: color.transparent,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
})
