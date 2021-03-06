/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, StyleSheet, StatusBar, ScrollView, Text, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { color, size, layout, style, styleType } from '../../common/MyStyle'
import { isDebug, LOG } from '../../utils/MyDebugUtils'
import LocalConfigManager from '../../common/LocalConfigManager'
import MyStatusBar from '../../components/MyStatusBar'
import { px, sp } from '../../utils/Device'
import { Container, Header, Content, Button } from 'native-base'
import { blue, black } from 'ansi-colors'
import { endpoint } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import LoginManager from '../../common/LoginManager'
import { event, localStore, images } from '../../common/Constants'
import { showToast } from '../../utils/MyToastUtils'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.state = {
      maxCanBorrow: '*',
      location: '苏州',
    }

    this.willFocusSubscription = this.props.navigation.addListener('didFocus', (payload) => {
      LoginManager.updateProfileByServer()
      navigator.geolocation.getCurrentPosition((location) => {
        // longitude: location.coords.longitude,//经度
        // latitude: location.coords.latitude,//纬度
        MyHttpUtils.fetchRequest('post', endpoint.common.get_location, {
          lng: location.coords.longitude,
          lat: location.coords.latitude,
        }).then((responseJson) => {
          this.setState({
            location: responseJson.data.city,
          })
        })
      })
    })
  }

  applyNow = () => {
    if (LoginManager.isLogin()) {
      this.props.navigation.navigate('PermissionRequest')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* transparent保证沉浸式状态栏生效 */}
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
        {/* 顶部背景 */}
        <Image style={{ width: size.screen_width, height: px(180) }} source={images.home_top_bg} />
        {/* 顶部图标和定位 */}
        <View
          style={{
            padding: px(18),
            marginTop: size.statusbar_height,
            position: 'absolute',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Image style={{ width: px(23), height: px(22) }} source={images.logo} />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Image style={{ width: px(18), height: px(18) }} source={images.address_icon} />
            <Text style={{ fontSize: sp(14), paddingLeft: px(5), color: '#ffffff' }}>{this.state.location}</Text>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '85%',
            paddingHorizontal: px(28),
            marginTop: size.statusbar_height + px(64),
          }}
        >
          {/* 可滚动的申请额度面板 */}
          <View style={{ display: 'flex', alignItems: 'center' }}>
            {/* 最高可借额度、申请额度 */}
            <Image style={styleType == 0 ? styles.home_top_bg_image : styles.home_top_bg_image1} source={images.home_top_input_bg} />
            {styleType == 0 ? (
              // 第一版  最高可借额度、申请额度
              <View
                style={{
                  height: '100%',
                  position: 'absolute',
                  alignItems: 'center',
                  width: '100%',
                  bottom: '20%',
                }}
              >
                <Text style={{ color: '#525252', fontSize: sp(14), marginTop: px(60), fontWeight: 'bold' }}>最高可借额度(元)</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#6DC9F7', fontWeight: 'bold', fontSize: sp(40) }}>¥</Text>
                  <Text style={{ color: '#6DC9F7', fontWeight: 'bold', fontSize: sp(40) }}>{this.state.maxCanBorrow}</Text>
                </View>
                <Button
                  full
                  style={{
                    position: 'absolute',
                    backgroundColor: '#F58C00',
                    left: '25%',
                    width: px(157),
                    height: px(35),
                    borderRadius: px(4),
                    bottom: 0,
                  }}
                  onPress={() => {
                    this.applyNow()
                  }}
                >
                  <Text style={{ color: color.white, fontWeight: 'bold' }}>申请额度</Text>
                </Button>
              </View>
            ) : (
              // 商务版  最高可借额度、申请额度
              <View
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '10%',
                }}
              >
                <Text style={{ color: '#FDFDFD', fontSize: sp(14), fontWeight: 'bold' }}>最高可借额度(元)</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#FDFDFD', fontWeight: 'bold', fontSize: sp(40) }}>¥</Text>
                  <Text style={{ color: '#FDFDFD', fontWeight: 'bold', fontSize: sp(40) }}>{this.state.maxCanBorrow}</Text>
                </View>
                <Button
                  full
                  style={{
                    backgroundColor: '#E7CA7F',
                    width: px(157),
                    height: px(35),
                    borderRadius: px(4),
                  }}
                  onPress={() => {
                    this.applyNow()
                  }}
                >
                  <Text style={{ color: color.white, fontWeight: 'bold' }}>申请额度</Text>
                </Button>
              </View>
            )}
          </View>

          {/* 提交申请、在线审核、马上体现文案显示 */}
          <Text style={styles.text}>秒出额度</Text>
          <Image style={{ width: '100%', height: px(61) }} source={images.home_second} />
          <Text style={styles.text}>产品服务</Text>
          <View style={styles.product_service}>
            <TouchableOpacity
              onPress={() => {
                this.applyNow()
              }}
            >
              <Image style={styles.product_service_pic} source={images.up_money} />
              <Text style={{ color: '#0F0F0F', marginTop: 5, textAlign: 'center' }}>提升额度</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showToast('新功能敬请期待！')
              }}
            >
              <Image style={styles.product_service_pic} source={images.new_road} />
              <Text style={{ color: '#0F0F0F', marginTop: 5, textAlign: 'center' }}>新口子</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showToast('新功能敬请期待！')
              }}
            >
              <Image style={styles.product_service_pic} source={images.all} />
              <Text style={{ color: '#0F0F0F', marginTop: 5, textAlign: 'center' }}>全部</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>更多服务</Text>
          <View style={styles.more_service}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}
              onPress={() => {
                this.props.navigation.navigate('BorrowQA')
              }}
            >
              <Image style={{ width: px(24), height: px(24) }} source={images.borrow_question} />
              <Text style={styles.more_service_text}>借款问题</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}
              onPress={() => {
                this.props.navigation.navigate('PayQA')
              }}
            >
              <Image style={{ width: px(30), height: px(24) }} source={images.pay_question} />
              <Text style={styles.more_service_text}>还款问题</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}
              onPress={() => {
                this.props.navigation.navigate('AmountQA')
              }}
            >
              <Image style={{ width: px(18), height: px(26) }} source={images.limit} />
              <Text style={styles.more_service_text}>额度问题</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  /**
   * {
    "status": "success",
    "code": 200,
    "data": {
        "unread_msg": 0,
        "expire_borrow_sn": 0,
        "up_high_limit": 0
    }
}
   */
  checkmsg = (fromLogin = true) => {
    if (LoginManager.isLogin()) {
      this.setState({
        maxCanBorrow: LoginManager.userInfo.borrow_limit,
      })
      MyHttpUtils.fetchRequest('post', endpoint.message.check).then((responseJson) => {
        if (responseJson.data.expire_borrow_sn) {
          // showToast('您有已逾期订单，请及时还款')
          LoginManager.expire_borrow_sn = responseJson.data.expire_borrow_sn
        } else {
          LoginManager.expire_borrow_sn = undefined
        }
        DeviceEventEmitter.emit(event.refreshAppState)
      })
    } else {
      this.setState({
        maxCanBorrow: '20,000.00',
      })
    }
  }

  componentDidMount() {
    this.checkmsg()
    let that = this
    this.listener = DeviceEventEmitter.addListener(event.loginStatusChange, function() {
      that.checkmsg()
    })
    this.listenerForUserProfile = DeviceEventEmitter.addListener(event.userProfileUpdate, function() {
      that.checkmsg(false)
    })
    if (isDebug()) {
      setTimeout(() => {
        if (LocalConfigManager.debugScreen) {
          this.props.navigation.navigate(LocalConfigManager.debugScreen)
        }
      }, 300)
    }
  }

  componentWillUnmount() {
    this.listener.remove()
    this.willFocusSubscription.remove()
    this.listenerForUserProfile.remove()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    marginVertical: px(14),
    fontSize: sp(16),
    color: '#111111',
    fontWeight: 'bold',
  },
  product_service: {
    paddingLeft: px(15),
    paddingRight: px(15),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product_service_pic: {
    width: px(65),
    height: px(46.6),
  },
  more_service: {
    width: '100%',
    height: px(59),
    backgroundColor: '#F9C691',
    borderRadius: px(8),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: px(15),
  },
  more_service_text: {
    color: '#111111',
    fontSize: sp(12),
    paddingTop: px(5),
    paddingLeft: px(4),
  },
  home_top_bg_image: {
    width: '100%',
    height: px(194),
  },
  home_top_bg_image1: {
    width: '100%',
    height: px(146),
    borderRadius: px(8),
  },
})
