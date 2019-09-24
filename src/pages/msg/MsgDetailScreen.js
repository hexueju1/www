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
import TabHeader from '../../common/TabHeader'

export default class MsgDetailScreen extends BaseScreen {
  messageId = ''

  constructor(props) {
    super(props)
    this.messageId = this.props.navigation.getParam('messageId')
    this.state = {
      title: '',
      content: '',
      createtime: '',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="详情" />
        <Text>{this.state.status}</Text>
        <View style={styles.line}>
          <Text style={styles.value}>{this.state.title}</Text>
          <Text style={styles.value}>{this.state.content}</Text>
          <Text style={styles.value}>{this.state.createtime}</Text>
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    /**
                     * {
    "code": 1,
    "msg": "",
    "time": "1566290330",
    "data": {
        "id": 85100,
        "admin_id": 120,
        "user_id": 65538,
        "title": "借款还款通知",
        "description": "",
        "content": "编号为20190811385903964083的借款已还清！",
        "createtime": 1565700562,
        "updatetime": 1566290330,
        "status": "normal",
        "status_text": "正常"
    }
}
                     * */
    MyHttpUtils.fetchRequest('post', endpoint.user.messageDetails, { id: this.messageId }).then((responseJson) => {
      let detail = responseJson.data
      this.setState({
        title: detail.title,
        content: detail.content,
        createtime: detail.createtime,
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
