/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, Text } from 'react-native'
import { color, size, layout, style } from '../../common/MyStyle'
import { isDebug, LOG } from '../../utils/MyDebugUtils'
import LocalConfigManager from '../../common/LocalConfigManager'
import MyStatusBar from '../../components/MyStatusBar'
import { px, sp } from '../../utils/Device'
import { Container, Header, Content, Button } from 'native-base'
import { blue, black } from 'ansi-colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // static navigationOptions = () => ({
  //   title: '借款',
  // })

  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.state = {
      maxCanBorrow: '20,000.00',
      location: '苏州',
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* transparent保证沉浸式状态栏生效 */}
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
        {/* 顶部背景 */}
        <Image style={{ width: size.screen_width, height: px(180) }} source={require('../../images/home/home_top_bg.png')} />
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
            <Image style={{ width: px(23), height: px(22) }} source={require('../../images/png/logo.png')} />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Image style={{ width: px(18), height: px(18) }} source={require('../../images/png/address_icon.png')} />
            <Text style={{ fontSize: sp(14), paddingLeft: px(5), color: '#ffffff' }}>{this.state.location}</Text>
          </View>
        </View>

        <ScrollView
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: px(28),
            marginTop: size.statusbar_height + px(64),
          }}
          contentContainerStyle={{}}
        >
          {/* 可滚动的申请额度面板 */}
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: '100%', height: px(194) }} source={require('../../images/home/home_top_input_bg.png')} />
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
                  this.props.navigation.navigate('Login')
                }}
              >
                <Text style={{ color: color.white, fontWeight: 'bold' }}>申请额度</Text>
              </Button>
            </View>
          </View>

          <Text style={styles.text}>秒出额度</Text>
          <Image style={{ width: '100%', height: px(61) }} source={require('../../images/home/home_second.png')} />
          <Text style={styles.text}>产品服务</Text>
          <View style={styles.product_service}>
            <Image style={styles.product_service_pic} source={require('../../images/png/up_money.png')} />
            <Image style={styles.product_service_pic} source={require('../../images/png/new_road.png')} />
            <Image style={styles.product_service_pic} source={require('../../images/png/all.png')} />
          </View>
          <Text style={styles.text}>更多服务</Text>
          <View style={styles.more_service}>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}>
              <Image style={{ width: px(24), height: px(24) }} source={require('../../images/png/borrow_question.png')} />
              <Text style={styles.more_service_text}>借款问题</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}>
              <Image style={{ width: px(30), height: px(24) }} source={require('../../images/png/pay_question.png')} />
              <Text style={styles.more_service_text}>还款问题</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: px(16) }}>
              <Image style={{ width: px(18), height: px(26) }} source={require('../../images/png/limit.png')} />
              <Text style={styles.more_service_text}>额度问题</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    if (isDebug()) {
      setTimeout(() => {
        if (LocalConfigManager.debugScreen) {
          this.props.navigation.navigate(LocalConfigManager.debugScreen)
        }
      }, 300)
    }
  }

  componentWillUnmount() {}
}

var styles = StyleSheet.create({
  main_container: {
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
    width: px(71),
    height: px(46),
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
    fontSize: px(12),
    paddingTop: px(5),
    paddingLeft: px(4),
  },
})
