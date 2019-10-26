/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, StyleSheet, ScrollView, Text, Picker, ImageBackground } from 'react-native'
import { color, size, layout, style } from '../../common/MyStyle'
import { isDebug, LOG } from '../../utils/MyDebugUtils'
import LocalConfigManager from '../../common/LocalConfigManager'
import MyStatusBar from '../../components/MyStatusBar'
import { px, sp } from '../../utils/Device'
import { Container, Header, Content, Button } from 'native-base'
import { blue, black } from 'ansi-colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TabHeader from '../../common/TabHeader'
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { showToast } from '../../utils/MyToastUtils'

/**
 *
 *
 * 写页面的时候，可变的数据不要写死，统一放在state里面引用
 *
 */
export default class RepaymentScreen extends React.Component {
  ordersn = ''
  checktime = ''
  apply_borrow = ''
  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.ordersn = this.props.navigation.getParam('ordersn')
    this.checktime = this.props.navigation.getParam('checktime')
    this.apply_borrow = this.props.navigation.getParam('apply_borrow')
    this.state = {
      language: 0,
    }
  }

  pay = () => {
    MyHttpUtils.fetchRequest('post', endpoint.payment.check, { ordersn: this.ordersn, type: this.state.language }).then((responseJson) => {})
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="借款"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <ScrollView
          style={{ position: 'absolute', width: '100%', height: '85%', paddingHorizontal: px(28), marginTop: size.statusbar_height + px(30) }}
          contentContainerStyle={{}}
        >
          <ImageBackground style={[styles.main]} source={images.repay_main}>
            <Picker selectedValue={this.state.language} style={styles.select} onValueChange={(Value) => this.setState({ language: Value })}>
              <Picker.Item value={0} label="全额还款" />
              <Picker.Item value={1} label="续期一天" />
              <Picker.Item value={2} label="续期一期" />
            </Picker>
            <View style={{ height: '100%', position: 'absolute', marginTop: px(38), marginLeft: px(103) }}>
              <Text style={{ color: '#0F0F0F', fontSize: sp(14) }}>{this.checktime.substr(0, 10)}</Text>
              <Text style={{ color: '#0F0F0F', fontSize: sp(14) }}>{this.checktime.substr(11, 5)}</Text>
            </View>
          </ImageBackground>
          <View style={{ position: 'relative' }}>
            <Text style={{ color: '#F0A00B', fontWeight: 'bold', fontSize: sp(44), position: 'absolute', top: px(-118), left: px(30) }}>
              ¥{this.apply_borrow}
            </Text>
          </View>
          <View style={[styles.touchableopacity]}>
            <TouchableOpacity style={styles.button} onPress={this.pay}>
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
    backgroundColor: color.primary_bg,
  },
  text: {
    // marginVertical: px(14),
    fontSize: sp(16),
    color: '#0F0F0F',
  },
  back: {
    width: px(48),
    height: px(27),
  },
  main: {
    width: px(325),
    height: px(370),
    borderRadius: px(8),
    overflow: 'hidden',
    marginTop: px(31),
  },
  button: {
    height: px(48),
    width: px(268),
    borderRadius: px(24),
    borderColor: color.white,
    borderWidth: px(1),
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
    backgroundColor: color.primary_bg,
    color: '#FDFDFD',

    borderTopLeftRadius: px(100),
  },
})
