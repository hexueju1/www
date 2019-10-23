/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { TouchableHighlight, ScrollView, DeviceEventEmitter, Image, StyleSheet, Text, View, Alert, ImageBackground, StatusBar } from 'react-native'
import BaseScreen from '../../components/BaseScreen'
import { color, size, layout, style } from '../../common/MyStyle'
import { event, localStore, images, endpoint } from '../../common/Constants'
import LoginManager from '../../common/LoginManager'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { isDebug } from '../../utils/MyDebugUtils'
import SettingItem from '../../components/SettingItem'
import SettingItemBigPic from '../../components/SettingItemBigPic'
import SettingItemTextTopDown from '../../components/SettingItemTextTopDown'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { showToast } from '../../utils/MyToastUtils'
import MyStoreManager from '../../common/MyStoreManager'
import { Label, Button } from 'native-base'
import { px, sp } from '../../utils/Device'

export default class MeScreen extends BaseScreen {
  static navigationOptions = () => ({
    header: null,
  })

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      displayTitle: '请登录个人用户',
      maxCanBorrow: '***',
      displayName: '***',
      loginOrLogout: '登录',
      number: '*',
    }
    this.willFocusSubscription = this.props.navigation.addListener('didFocus', (payload) => {
      if (LoginManager.isLogin()) {
        MyHttpUtils.fetchRequest('post', endpoint.borrow.before_borrow).then((responseJson) => {
          this.setState({
            maxCanBorrow: responseJson.data.user.borrow_limit,
            number: responseJson.data.user.borrowed_times,
          })
          console.log(responseJson.data.user.borrow_limit)
        })
      } else {
        this.setState({
          maxCanBorrow: '20,000.00',
        })
      }
      console.log(LoginManager.userInfo.borrow_limit)
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />

        <ScrollView>
          {/* transparent保证沉浸式状态栏生效 */}
          {/* 顶部图标 */}
          <View
            style={{
              padding: px(18),
              marginTop: size.statusbar_height,
              // position: 'absolute',
              width: '100%',
            }}
          >
            <View style={{ flex: 1 }}>
              <Image style={{ width: px(23), height: px(22) }} source={images.logo} />
            </View>
          </View>
          {/* 顶部背景 */}
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: px(354), height: px(268), position: 'relative', top: px(-40) }} source={images.personal_pic} />
            <View
              style={{
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
                top: '20%',
              }}
            >
              <Text style={{ color: '#0F0F0F', fontSize: sp(18) }}>{this.state.displayTitle}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(40) }}>¥</Text>
                <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(40) }}>{this.state.maxCanBorrow}</Text>
              </View>
            </View>
            <Text style={{ fontSize: sp(18), color: '#E7912D', position: 'absolute', top: px(190), left: px(94) }}>{this.state.displayName}</Text>
            <Text style={{ fontSize: sp(18), color: '#E7912D', position: 'absolute', top: px(165), left: px(300) }}>
              {this.state.number}
              <Text style={{ color: '#FDFDFD', fontSize: sp(12) }}>笔</Text>
            </Text>
          </View>
          {/* 个人界面--列表 */}
          <View style={[styles.settingitem]}>
            <SettingItem
              imageUrl={images.my_info}
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
              imageUrl={images.need_borrow}
              text={'我要借钱'}
              onPress={() => {
                if (LoginManager.isLogin()) {
                  this.props.navigation.navigate('Home')
                } else {
                  this.props.navigation.navigate('Login')
                }
              }}
            />
            <SettingItem
              imageUrl={images.my_card}
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
              imageUrl={images.about_us}
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

          <View style={[styles.touchableopacity]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (LoginManager.isLogin()) {
                  this.showAlert()
                } else {
                  this.props.navigation.navigate('Login')
                }
                console.log('islogin', LoginManager.isLogin())
              }}
            >
              <Text style={styles.buttonText}>{LoginManager.isLogin() ? '注销登录' : '登录'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  // 退出确认
  showAlert = () => {
    Alert.alert(
      '',
      '确认退出吗',
      [{ text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }, { text: '确定', onPress: () => LoginManager.logout() }],
      { cancelable: false },
    )
  }

  componentDidMount() {
    let that = this
    this.listener = DeviceEventEmitter.addListener(event.loginStatusChange, function() {
      that.setState({
        isLogin: LoginManager.isLogin(),
        displayName: LoginManager.isLogin() ? LoginManager.userInfo.username : '***',
        displayTitle: LoginManager.isLogin() ? '我的额度' : '请登录个人用户',
        loginOrLogout: LoginManager.isLogin() ? '注销登录' : '登录',
        maxCanBorrow: LoginManager.isLogin() ? LoginManager.userInfo.borrow_limit : '***',
        number: LoginManager.isLogin() ? LoginManager.userInfo.borrowed_times : '*',
      })
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f58c00',
  },
  button: {
    height: px(48),
    width: px(268),
    borderRadius: px(24),
    borderColor: color.white,
    borderWidth: 1,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    left: '50%',
    marginLeft: px(-134),
  },
  buttonText: {
    textAlign: 'center',
    color: color.primary_text,
    fontSize: sp(18),
  },
  settingitem: {
    backgroundColor: '#FDFDFD',
    marginLeft: px(19),
    marginRight: px(19),
    borderRadius: px(8),
  },
  touchableopacity: {
    paddingTop: px(19),
    paddingBottom: px(60),
  },
})
