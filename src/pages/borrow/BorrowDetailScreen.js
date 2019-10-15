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
import { size } from '../../common/MyStyle'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { endpoint, images } from '../../common/Constants'
import TabHeader from '../../common/TabHeader'
import { px, sp } from '../../utils/Device'

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
      statusText: '账单已还清',
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="详情"
          onPress={() => {
            this.props.navigation.goback()
          }}
        />
        {/* <Text>{this.state.status}</Text> */}
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
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.borrow.detail, { type: 0, ordersn: this.sn }).then((responseJson) => {
      let detail = responseJson.data.detail
      this.setState({
        status: detail.status,
        ordersn: detail.ordersn,
        goods_name: detail.goods_name,
        apply_borrow: detail.apply_borrow,
        createtime: detail.createtime,
        checktime: detail.checktime,
      })
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
})
