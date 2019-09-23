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
  SafeAreaView,
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
export default class BorrowTab extends BaseScreen {
  static navigationOptions = () => ({
    title: '借款记录',
  })

  constructor(props) {
    super(props)
    this.state = {
      listData: [],
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        style={{ flexDirection: 'row', justifyContent: 'center' }}
        onPress={() => {
          console.log('heheda')
          // TODO 查看NativeBase跳转逻辑
          // this.props.navigation.navigate('BorrowDetail', { ordersn: item.sn, type: this.props.type })
        }}
      >
        <Card>
          <CardItem header bordered>
            <Text>xxxxxxxxx</Text>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <FlatList
          style={{ width: size.screen_width }}
          data={this.state.listData}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.header}
          ListEmptyComponent={<CommonNoData />}
          // 解决唯一key的问题
          keyExtractor={(item, index) => 'index' + index}
        />
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    // 借款记录1 申请0
    MyHttpUtils.fetchRequest('post', endpoint.borrow.get_list, { page: 1, type: this.props.type }).then((responseJson) => {
      this.setState({
        listData: responseJson.data.rows,
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
})
