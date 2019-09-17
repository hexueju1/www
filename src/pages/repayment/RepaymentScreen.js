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
      hasBorrowed: '20,000.00',
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
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>借款</Text>
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
            </View>

            <Button
              full
              style={{
                position: 'absolute',
                backgroundColor: '#FDFDFD',
                width: px(268),
                height: px(48),
                borderRadius: px(200),
                bottom: 0,
              }}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <Text style={{ color: color.primary_text }}>提前还款</Text>
            </Button>
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
    backgroundColor: color.primary_bg,
  },
  text: {
    marginVertical: px(14),
    fontSize: sp(16),
    color: '#111111',
    fontWeight: 'bold',
  },
})
