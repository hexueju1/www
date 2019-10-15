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
import BorrowList from '../../components/BorrowList'
import { showToast } from '../../utils/MyToastUtils'

export default class BorrowHistoryScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      statusText: '',
    }
  }

  /**
   *  { goods_name: '满天星',
09-24 20:05:56.627 32168  7307 I ReactNativeJS:           sn: '20190823201023408237',
09-24 20:05:56.627 32168  7307 I ReactNativeJS:           date: '2019-08-23',
09-24 20:05:56.627 32168  7307 I ReactNativeJS:           days: 6,
09-24 20:05:56.627 32168  7307 I ReactNativeJS:           status: '0',
09-24 20:05:56.627 32168  7307 I ReactNativeJS:           borrow_money: '1,600.00' }
   */
  renderItem = ({ item }) => {
    return (
      <BorrowList
        setitem={item}
        onPress={() => {
          this.props.navigation.navigate('BorrowDetail', { sn: item.sn })
        }}
      ></BorrowList>
    )
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="借款记录"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <FlatList
          style={{ width: size.screen_width, marginTop: 25 }}
          data={this.state.listData}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.header}
          ListEmptyComponent={<CommonNoData />}
          // 解决唯一key的问题
          keyExtractor={(item, index) => 'index' + index}
        />
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    // 借款记录1 申请0
    MyHttpUtils.fetchRequest('post', endpoint.user.borrowList, { page: 1, type: this.props.type }).then((responseJson) => {
      let detail = responseJson.data.data
      this.setState({ listData: detail })
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
})
