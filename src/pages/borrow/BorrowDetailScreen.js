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
import { endpoint } from '../../common/Constants'
import TabHeader from '../../common/TabHeader'

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
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="详情" />
        <Text>{this.state.status}</Text>
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
  },
  line: {
    paddingHorizontal: 20,
  },
  title: {},
  value: {},
})
