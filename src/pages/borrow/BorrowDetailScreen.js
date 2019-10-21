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
      statusText: '',
      days: '',
    }
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
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="详情"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        {shoecontent}
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
      })
      switch (detail.data.data.apply_status) {
        case '0':
          this.setState({ statusText: '审核中' })
          break
        case '1':
          this.setState({ statusText: '审核通过' })
          break
        case '2':
          this.setState({ statusText: '审核拒绝' })
          break
      }
      if (detail.data.data.apply_status == '1') {
        switch (detail.data.data.status) {
          case '0':
            this.setState({ statusText: '放款中' })
            break
          case '1':
            this.setState({ statusText: '未到还款日' })
            break
          case '2':
            this.setState({ statusText: '账单已还清' })
            break
          case '3':
            this.setState({ statusText: '账单已逾期' })
            break
          case '4':
            this.setState({ statusText: '续期中' })
            break
          case '5':
            this.setState({ statusText: '已到还款日' })
            break
        }
      }
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
