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
      <View style={styles.main_container}>
        <TabHeader text="消息详情" />
        {/* <Text>{this.state.status}</Text> */}
        <Text style={styles.time}>{this.createtime.split(' ')[0]}</Text>
        <View style={styles.line}>
          <Image style={{ width: px(26), height: px(26), marginRight: px(8) }} source={images.msglist_logo} />
          <Text>{this.state.title}</Text>
        </View>
        <View style={styles.contenttext}>
          <Text style={{ fontSize: sp(12), marginLeft: px(41) }}>{this.state.content}</Text>
        </View>
      </View>
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
    MyHttpUtils.fetchRequest('post', endpoint.message.detail, { id: this.messageId }).then((responseJson) => {
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
    marginTop: px(7),
    marginHorizontal: px(20),
    paddingHorizontal: px(20),
    width: px(338),
    height: px(45),
    borderTopLeftRadius: px(8),
    borderTopRightRadius: px(8),
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: px(1),
    borderColor: '#F0F0F0',
  },
  time: {
    width: px(119),
    height: px(24),
    borderRadius: px(12),
    backgroundColor: '#DFDFDF',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: px(11),
  },
  contenttext: {
    width: px(338),
    height: px(55),
    marginHorizontal: px(20),
    borderBottomLeftRadius: px(8),
    borderBottomRightRadius: px(8),
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
