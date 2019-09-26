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
    this.createtime = this.props.navigation.getParam('createtime')
    this.state = {
      title: '',
      content: '',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="消息详情" />
        {/* <Text>{this.state.status}</Text> */}
        <Text style={styles.time}>{this.createtime.split(' ')[0]}</Text>
        <View style={styles.line}>
          <Image style={{ width: 26, height: 26, marginRight: 8 }} source={require('../../images/png/msglist_logo.png')} />
          <Text>{this.state.title}</Text>
        </View>
        <View style={styles.contenttext}>
          <Text style={{ fontSize: 12, marginLeft: 41 }}>{this.state.content}</Text>
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
    backgroundColor: '#E9ECEF',
  },
  line: {
    marginTop: 7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    width: 338,
    height: 45,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  time: {
    width: 119,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DFDFDF',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 11,
  },
  contenttext: {
    width: 338,
    height: 55,
    marginHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
