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
  StatusBar,
} from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import TabHeader from '../../common/TabHeader'

export default class MyMsgScreen extends BaseScreen {
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
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MsgDetail', { messageId: item.id, createtime: item.createtime })
        }}
        style={styles.touch}
      >
        <Text style={styles.time}>{item.createtime.split(' ')[0]}</Text>
        <View style={styles.content}>
          <Image style={{ width: px(26), height: px(26), marginRight: px(34) }} source={images.msglist_logo} />
          <Text>{item.title}</Text>
          <Text style={{ color: '#ABABAB', fontSize: sp(12), marginLeft: px(90) }}>查看详情></Text>
          {/* <Text>{item.content}</Text> */}
          {/* <Text>{item.createtime}</Text> */}
          {/* <Text>{item.status_text}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="我的消息" />
        <FlatList
          data={this.state.datalist}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.message.list).then((responseJson) => {
      this.setState({
        datalist: responseJson.data.data,
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
  touch: {
    paddingHorizontal: px(20),
    marginTop: px(12),
  },
  content: {
    marginTop: px(7),
    paddingHorizontal: px(20),
    width: px(338),
    height: px(45),
    borderRadius: px(8),
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    width: px(119),
    height: px(24),
    borderRadius: px(12),
    backgroundColor: '#DFDFDF',
    alignSelf: 'center',
    textAlign: 'center',
  },
})
