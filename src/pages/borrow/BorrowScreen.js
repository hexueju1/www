/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, StyleSheet, StatusBar, ScrollView, Text, Picker, ImageBackground, DeviceEventEmitter } from 'react-native'
import { color, size, layout, style } from '../../common/MyStyle'
import { isDebug, LOG } from '../../utils/MyDebugUtils'
import LocalConfigManager from '../../common/LocalConfigManager'
import MyStatusBar from '../../components/MyStatusBar'
import { px, sp } from '../../utils/Device'
import { Container, Header, Content, Button } from 'native-base'
import { blue, black } from 'ansi-colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TabHeader from '../../common/TabHeader'
import { showToast } from '../../utils/MyToastUtils'
import { event, localStore, endpoint, images } from '../../common/Constants'
import LoginManager from '../../common/LoginManager'
import MyHttpUtils from '../../utils/MyHttpUtils'
/**
 *
 *
 * 写页面的时候，可变的数据不要写死，统一放在state里面引用
 *
 */
export default class BorrowScreen extends React.Component {
  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.state = {
      hasBorrowed: '0.00',
      borrowDays: '0',
      Date_main: '',
      Date_detail: '',
      is_payoff: '您还没有订单',
      payoffDay: '',
    }
    this.willFocusSubscription = this.props.navigation.addListener('didFocus', (payload) => {
      if (LoginManager.isLogin()) {
        MyHttpUtils.fetchRequest('post', endpoint.user.borrowList, { limit: 500 }).then((responseJson) => {
          that.setState({
            hasBorrowed: responseJson.data.data[0].apply_borrow,
            borrowDays: responseJson.data.data[0].borrowing_days,
            Date_main: responseJson.data.data[0].create_time.substr(0, 10),
            Date_detail: responseJson.data.data[0].create_time.substr(11, 5),
            payoffDay: responseJson.data.data[0].expiration_time.substr(5, 5),
          })
          switch (responseJson.data.data[0].apply_status) {
            case '0':
              that.setState({ is_payoff: '订单审核中' })
              break
            case '1':
              that.setState({ is_payoff: '审核通过' })
              break
            case '2':
              that.setState({ is_payoff: '审核拒绝' })
              break
          }
          if (responseJson.data.data[0].apply_status == '1') {
            switch (responseJson.data.data[0].status) {
              case '0':
                that.setState({ is_payoff: '放款中' })
                break
              case '1':
                that.setState({ is_payoff: '未到还款日' })
                break
              case '2':
                that.setState({ is_payoff: '账单已还清' })
                break
              case '3':
                that.setState({ is_payoff: '账单已逾期' })
                break
              case '4':
                that.setState({ is_payoff: '续期中' })
                break
              case '5':
                that.setState({ is_payoff: '已到还款日' })
                break
            }
          }
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* 统一头部 */}
        <TabHeader
          text="借款"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />

        <ScrollView
          style={{
            position: 'absolute',
            width: '100%',
            height: '85%',
            paddingHorizontal: px(28),
            marginTop: size.statusbar_height + px(30),
          }}
          contentContainerStyle={{}}
        >
          {/* 中间的大图片 */}
          <ImageBackground style={[styles.main]} source={images.borrow_pic}>
            {/* 图片中的数据定位 */}
            <View
              style={{
                height: '100%',
                position: 'absolute',
                marginTop: 20,
                marginLeft: 103,
              }}
            >
              <Text style={{ color: '#0F0F0F', fontSize: sp(14) }}>{this.state.Date_main}</Text>
              <Text style={{ color: '#0F0F0F', fontSize: sp(14), marginTop: px(5) }}>{this.state.Date_detail}</Text>
            </View>
          </ImageBackground>

          {/*图片中数据的布局 */}
          <View style={{ position: 'relative' }}>
            {/* 右上角全部借款按钮 */}
            <View
              style={styles.clickButton}
              onTouchStart={() => {
                this.props.navigation.navigate('BorrowHistory')
              }}
            >
              <Text style={{ color: '#FDFDFD', marginRight: px(7) }}>全部借款</Text>
              <Image style={{ width: px(20), height: px(20) }} source={images.small_borrow} />
            </View>

            {/* 借款金额 */}
            <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(44), position: 'absolute', left: px(69), top: px(-225) }}>
              ¥{this.state.hasBorrowed}
            </Text>

            {/* 借款天数 */}
            <Text style={{ color: '#F0A00B', fontSize: sp(14), position: 'absolute', right: px(40), top: px(-125) }}>
              <Text style={{ color: '#F0A00B', fontSize: sp(36) }}>{this.state.borrowDays}</Text>天
            </Text>

            {/* 账单状态提醒 */}
            <View style={styles.payoffInfo}>
              <Image style={{ width: px(27), height: px(30) }} source={images.small_payoff} />
              <Text style={{ fontSize: sp(16), color: '#0F0F0F', marginLeft: px(18) }}>{this.state.is_payoff}</Text>
              <Text style={{ fontSize: sp(12), marginLeft: px(50) }}>还款时间</Text>
              <Text style={{ fontSize: sp(12), marginLeft: px(6) }}>{this.state.payoffDay}</Text>
            </View>
          </View>

          {/* 支付按钮 */}
          <View style={[styles.touchableopacity]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('BorrowHistory')
              }}
            >
              <Text style={styles.buttonText}>{'全部还款'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    let that = this
    this.listener = DeviceEventEmitter.addListener(event.loginStatusChange, function() {
      if (LoginManager.isLogin()) {
        MyHttpUtils.fetchRequest('post', endpoint.user.borrowList, { limit: 500 }).then((responseJson) => {
          that.setState({
            hasBorrowed: responseJson.data.data[0].apply_borrow,
            borrowDays: responseJson.data.data[0].borrowing_days,
            Date_main: responseJson.data.data[0].create_time.substr(0, 10),
            Date_detail: responseJson.data.data[0].create_time.substr(11, 5),
            payoffDay: responseJson.data.data[0].expiration_time.substr(5, 5),
          })
          switch (responseJson.data.data[0].apply_status) {
            case '0':
              that.setState({ is_payoff: '订单审核中' })
              break
            case '1':
              that.setState({ is_payoff: '审核通过' })
              break
            case '2':
              that.setState({ is_payoff: '审核拒绝' })
              break
          }
          if (responseJson.data.data[0].apply_status == '1') {
            switch (responseJson.data.data[0].status) {
              case '0':
                that.setState({ is_payoff: '放款中' })
                break
              case '1':
                that.setState({ is_payoff: '未到还款日' })
                break
              case '2':
                that.setState({ is_payoff: '账单已还清' })
                break
              case '3':
                that.setState({ is_payoff: '账单已逾期' })
                break
              case '4':
                that.setState({ is_payoff: '续期中' })
                break
              case '5':
                that.setState({ is_payoff: '已到还款日' })
                break
            }
          }
        })
      } else {
        that.setState({
          hasBorrowed: '0.00',
          borrowDays: '0',
          Date_main: '',
          Date_detail: '',
          is_payoff: '您还没有订单',
          payoffDay: '',
        })
      }
    })
  }

  componentWillUnmount() {
    this.listener.remove()
  }
}

var styles = StyleSheet.create({
  main_container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#F58C00',
  },
  text: {
    // marginVertical: px(14),
    fontSize: sp(16),
    color: '#0F0F0F',
  },
  back: {
    width: px(48),
    height: px(27),
  },
  main: {
    width: px(325),
    height: px(342),
    borderRadius: px(8),
    overflow: 'hidden',
    marginTop: px(31),
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
    color: '#F58C00',
    fontSize: sp(18),
  },
  touchableopacity: {
    paddingTop: px(41),
    paddingBottom: px(111),
  },
  select: {
    height: px(38),
    width: px(100),
    position: 'absolute',
    right: 0,
    top: px(38),
    backgroundColor: '#F58C00',
    color: '#FDFDFD',
  },
  clickButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: px(109),
    height: px(38),
    backgroundColor: '#F58C00',
    position: 'absolute',
    top: px(-300),
    right: 0,
    borderTopLeftRadius: px(25),
    borderBottomLeftRadius: px(25),
  },
  payoffInfo: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: -40,
    left: px(15),
  },
})
