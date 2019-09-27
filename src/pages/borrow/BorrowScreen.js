/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, Text, Picker, ImageBackground } from 'react-native'
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
/**
 *
 *
 * 写页面的时候，可变的数据不要写死，统一放在state里面引用
 *
 */
export default class RepaymentScreen extends React.Component {
  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.state = {
      hasBorrowed: '2,000.00',
      borrowDays: '6',
      Date_main: '2019年08月08日',
      Date_detail: '15:30',
      is_payoff: '已到还款日',
      payoffDay: '08月29日',
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* 统一头部 */}
        <TabHeader text="借款" />

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
              <Text style={{ color: '#0F0F0F', fontSize: sp(14), marginTop: 5 }}>{this.state.Date_detail}</Text>
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
              <Text style={{ color: '#FDFDFD', marginRight: 7 }}>全部还款</Text>
              <Image style={{ width: 20, height: 20 }} source={images.small_borrow} />
            </View>

            {/* 借款金额 */}
            <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(44), position: 'absolute', left: 69, top: -225 }}>
              ¥{this.state.hasBorrowed}
            </Text>

            {/* 借款天数 */}
            <Text style={{ color: '#F0A00B', fontSize: sp(14), position: 'absolute', right: 40, top: -125 }}>
              <Text style={{ color: '#F0A00B', fontSize: sp(36) }}>{this.state.borrowDays}</Text>天
            </Text>

            {/* 账单状态提醒 */}
            <View style={styles.payoffInfo}>
              <Image style={{ width: 27, height: 30 }} source={images.small_payoff} />
              <Text style={{ fontSize: 16, color: '#0F0F0F', marginLeft: 18 }}>{this.state.is_payoff}</Text>
              <Text style={{ fontSize: 12, marginLeft: 50 }}>还款时间</Text>
              <Text style={{ fontSize: 12, marginLeft: 6 }}>{this.state.payoffDay}</Text>
            </View>
          </View>

          {/* 支付按钮 */}
          <View style={[styles.touchableopacity]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                showToast('全部还款')
              }}
            >
              <Text style={styles.buttonText}>{'提前还款'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {}

  componentWillUnmount() {}
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
    width: 48,
    height: 27,
  },
  main: {
    width: 325,
    height: 342,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 31,
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
    color: '#F58C00',
    fontSize: 18,
  },
  touchableopacity: {
    paddingTop: 41,
    paddingBottom: 111,
  },
  select: {
    height: 38,
    width: 100,
    position: 'absolute',
    right: 0,
    top: 38,
    backgroundColor: '#F58C00',
    color: '#FDFDFD',
  },
  clickButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 109,
    height: 38,
    backgroundColor: '#F58C00',
    position: 'absolute',
    top: -300,
    right: 0,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  payoffInfo: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: -40,
    left: 15,
  },
})
