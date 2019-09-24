/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableHighlight,
  ScrollView,
  DeviceEventEmitter,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native'
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
    this.state = {
      maxCanBorrow: '2,000.00',
      person_money: '请登录个人用户',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <ScrollView>
          {/* transparent保证沉浸式状态栏生效 */}
          <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
          {/* 顶部图标 */}
          <View
            style={{
              padding: 18,
              marginTop: size.statusbar_height,
              // position: 'absolute',
              width: '100%',
            }}
          >
            <View style={{ flex: 1 }}>
              <Image style={{ width: 23, height: 22 }} source={require('../images/png/logo.png')} />
            </View>
          </View>
          {/* 顶部背景 */}
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 354, height: 268, position: 'relative', top: -40 }} source={require('../images/png/personal_pic.png')} />
            <View
              style={{
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
                top: '20%',
              }}
            >
              <Text style={{ color: '#0F0F0F', fontSize: 18 }}>{this.state.person_money}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: 40 }}>¥</Text>
                <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: 40 }}>{this.state.maxCanBorrow}</Text>
              </View>
            </View>
          </View>
          {/* 个人界面--列表 */}
          <View style={[styles.settingitem]}>
            <SettingItem
              imageUrl={require('../images/png/my_info.png')}
              text={'我的消息'}
              onPress={() => {
                if (LoginManager.isLogin()) {
                  this.props.navigation.navigate('MyMsg')
                } else {
                  this.props.navigation.navigate('Login')
                }
              }}
            />
            <SettingItem
              imageUrl={require('../images/png/need_borrow.png')}
              text={'我要借钱'}
              onPress={() => {
                if (LoginManager.isLogin()) {
                } else {
                  this.props.navigation.navigate('Login')
                }
              }}
            />
            <SettingItem
              imageUrl={require('../images/png/my_card.png')}
              text={'卡片管家'}
              onPress={() => {
                if (LoginManager.isLogin()) {
                  this.props.navigation.navigate('BankInfo')
                } else {
                  this.props.navigation.navigate('Login')
                }
              }}
            />
            <SettingItem
              imageUrl={require('../images/png/about_us.png')}
              text={'关于我们'}
              onPress={() => {
                if (LoginManager.isLogin()) {
                  this.props.navigation.navigate('About')
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
          </View>
          {/* 底部登录按钮 */}
          {LoginManager.isLogin() ? (
            <View style={[styles.touchableopacity]}>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>{'注销登录'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.touchableopacity]}>
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
                <Text style={styles.buttonText}>{'登录'}</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: '#f58c00',
  },
  button: {
    height: 48,
    width: 268,
    borderRadius: 24,
    borderColor: color.white,
    borderWidth: 1,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    left: '50%',
    marginLeft: -134,
  },
  buttonText: {
    textAlign: 'center',
    color: '#E7912D',
    fontSize: 18,
  },
  settingitem: {
    backgroundColor: '#FDFDFD',
    marginLeft: 19,
    marginRight: 19,
    borderRadius: 8,
  },
  touchableopacity: {
    paddingTop: 19,
    paddingBottom: 60,
  },
})
