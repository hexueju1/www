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
/**
 *
 *
 * 写页面的时候，可变的数据不要写死，统一放在state里面引用
 *
 */
export default class RepaymentScreen extends React.Component {
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
      hasBorrowed: '2,000.00',
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <StatusBar backgroundColor={color.transparent} barStyle="dark-content" translucent={true} />
        {/* 这个页面的状态栏没有使用通用的状态栏，尽量不要模仿 */}
        <View
          style={{
            marginTop: size.statusbar_height,
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Image style={[styles.back]} source={require('../../images/png/back.png')} />
          </View>
          <View style={{ flex: 1, alignItems: 'flex-start', position: 'relative', left: -15 }}>
            <Text style={styles.text}>还款</Text>
          </View>
        </View>

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
          <ImageBackground style={[styles.main]} source={require('../../images/png/repay_main.png')}>
            {/* 下拉框 */}
            <Picker
              selectedValue={this.state.language}
              style={[styles.select]}
              onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
            >
              <Picker.Item value="pay_all" label="全额还款" />
              <Picker.Item value="oneday" label="续期一天" />
              <Picker.Item value="period" label="续期一期" />
            </Picker>

            {/* 图片中的数据定位 */}
            <View
              style={{
                height: '100%',
                position: 'absolute',
                marginTop: 38,
                marginLeft: 103,
              }}
            >
              <Text style={{ color: '#0F0F0F', fontSize: sp(14) }}>2019年08月08日</Text>
              <Text style={{ color: '#0F0F0F', fontSize: sp(14) }}>15:30</Text>
            </View>
          </ImageBackground>
          <View style={{ position: 'relative' }}>
            <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(44), position: 'absolute', top: -118, left: 30 }}>
              ¥{this.state.hasBorrowed}
            </Text>
          </View>

          {/* 支付按钮 */}
          <View style={[styles.touchableopacity]}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>{'立即支付'}</Text>
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
    height: 370,
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
})
