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
  StatusBar,
} from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'

export default class MyMsgScreen extends BaseScreen {
  static navigationOptions = {
    title: '我的消息',
  }

  constructor(props) {
    super(props)
    this.state = {
      datalist: [],
    }
  }

  /**{
                "id": 108023,
                "admin_id": 120,
                "user_id": 65538,
                "title": "借款申请通知",
                "description": "",
                "content": "编号为20190911160117879615的借款申请提交成功, 请等待后台审核！",
                "createtime": "2019-09-11 16:01:17",
                "updatetime": 1568451123,
                "status": "normal",
                "status_text": "正常"
            } */
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
          <Text>{item.createtime}</Text>
          <Text>{item.status_text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar backgroundColor={color.primary_bg} barStyle="dark-content" translucent={false} />
        <FlatList
          data={this.state.datalist}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.user.get_msg_list).then((responseJson) => {
      this.setState({
        datalist: responseJson.data.rows,
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
