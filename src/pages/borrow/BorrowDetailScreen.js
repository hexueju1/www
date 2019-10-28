'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  requireNativeComponent,
  Platform,
  Dimensions,
  ToastAndroid,
  BackHandler,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'
import { Card, CardItem, Body, Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import CommonNoData from '../../components/CommonNoData'
import { size, color } from '../../common/MyStyle'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { endpoint, images } from '../../common/Constants'
import TabHeader from '../../common/TabHeader'
import { px, sp } from '../../utils/Device'
import { showToast } from '../../utils/MyToastUtils'
import LoginManager from '../../common/LoginManager'

export default class BorrowDetailScreen extends BaseScreen {
  sn = ''

  constructor(props) {
    super(props)
    this.sn = this.props.navigation.getParam('sn')
    this.state = {
      status: 2,
      ordersn: 2,
      goods_name: 2,
      apply_borrow: 2,
      createtime: 2,
      checktime: 2,
      statusText: '',
      days: '',
      show_renewal: [],
    }
  }

  add_show_renewal = (index, value) => {
    var items = this.state.show_renewal
    items[index] = value
    this.setState({
      show_renewal: items,
    })
  }

  render() {
    let shoecontent =
      this.state.borrow_status == '1' ? (
        <View style={styles.content}>
          <Image style={{ width: px(68), height: px(88), alignSelf: 'center', marginTop: px(24) }} source={images.small_payoff} />
          <Text style={{ alignSelf: 'center', marginBottom: px(30) }}>{this.state.statusText}</Text>
          <View style={styles.line}>
            <Text style={styles.title}>申请时间</Text>
            <Text style={styles.value}>{this.state.createtime}</Text>
          </View>
          {/* 根据status控制显示和隐藏 , 参考MeScreen的debug按钮*/}
          <View style={styles.line}>
            <Text style={styles.title}>还款时间</Text>
            <Text style={styles.value}>{this.state.checktime}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>产品名称</Text>
            <Text style={styles.value}>{this.state.goods_name}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>申请金额</Text>
            <Text style={styles.value}>{this.state.apply_borrow}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>订单编号</Text>
            <Text style={styles.value}>{this.state.ordersn}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <Image style={{ width: px(68), height: px(88), alignSelf: 'center', marginTop: px(24) }} source={images.small_payoff} />
          <Text style={{ alignSelf: 'center', marginBottom: px(30) }}>{this.state.statusText}</Text>
          <View style={styles.line}>
            <Text style={styles.title}>订单编号</Text>
            <Text style={styles.value}>{this.state.ordersn}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>产品名称</Text>
            <Text style={styles.value}>{this.state.goods_name}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>申请金额</Text>
            <Text style={styles.value}>{this.state.apply_borrow}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>申请天数</Text>
            <Text style={styles.value}>{this.state.days}天</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>申请时间</Text>
            <Text style={styles.value}>{this.state.createtime}</Text>
          </View>
        </View>
      )
    let button =
      this.state.borrow_status == '1' || this.state.borrow_status == '3' || this.state.borrow_status == '4' || this.state.borrow_status == '5' ? (
        <View style={[styles.touchableopacity]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Repayment', {
                ordersn: this.state.ordersn,
                checktime: this.state.checktime,
                apply_borrow: this.state.apply_borrow,
                show_renewal: this.state.show_renewal,
              })
            }}
          >
            <Text style={styles.buttonText}>{'立即还款'}</Text>
          </TouchableOpacity>
        </View>
      ) : null
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="详情"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        {shoecontent}
        {button}
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.user.borrowDetail, { ordersn: this.sn }).then((responseJson) => {
      // let detail = responseJson.data.detail
      let detail = responseJson
      this.setState({
        status: detail.status,
        ordersn: detail.data.data.ordersn,
        goods_name: detail.data.data.goods_name,
        apply_borrow: detail.data.data.apply_borrow,
        createtime: detail.data.data.createtime,
        checktime: detail.data.data.expirationtime,
        days: detail.data.data.days,
        borrow_status: detail.data.data.borrow_status,
        statusText: LoginManager.status_Text(detail.data.data.apply_status, detail.data.data.status),
      })
      this.add_show_renewal(0, String(detail.data.data.show_full_payment))
      this.add_show_renewal(1, String(detail.data.data.show_renewal_oneday))
      this.add_show_renewal(2, String(detail.data.data.show_renewal_onephase))
    })
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E9ECEF',
  },
  content: {
    margin: 20,
    height: px(374),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
  },
  line: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: px(42),
    borderBottomWidth: px(1),
    borderBottomColor: '#E9ECEF',
  },
  title: {},
  value: {
    marginLeft: px(19),
    fontSize: sp(12),
  },
  button: {
    height: px(48),
    width: px(268),
    borderRadius: px(24),
    borderColor: color.white,
    borderWidth: 1,
    backgroundColor: '#F58C00',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    left: '50%',
    marginLeft: px(-134),
  },
  buttonText: {
    textAlign: 'center',
    color: '#FDFDFD',
    fontSize: sp(18),
  },
})
