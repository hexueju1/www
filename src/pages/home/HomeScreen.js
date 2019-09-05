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
          <Image style={{ width: px(28), height: px(28) }} source={require('../../images/img/positive.png')} />
          <View>
            <Image style={{ width: px(28), height: px(28) }} source={require('../../images/img/positive.png')} />
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
                  backgroundColor: '#E7912D',
                  left: '25%',
                  width: '50%',
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
          <Image style={{ width: '100%', height: px(59) }} source={require('../../images/home/home_second.png')} />
          <Text style={styles.text}>产品服务</Text>
          <Text style={styles.text}>更多服务</Text>
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
})
