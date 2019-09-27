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
          <Image style={{ width: 26, height: 26, marginRight: 34 }} source={images.msglist_logo} />
          <Text>{item.title}</Text>
          <Text style={{ color: '#ABABAB', fontSize: 12, marginLeft: 90 }}>查看详情></Text>
          {/* <Text>{item.content}</Text> */}
          {/* <Text>{item.createtime}</Text> */}
          {/* <Text>{item.status_text}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="我的消息" />
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
    backgroundColor: '#E9ECEF',
  },
  touch: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  content: {
    marginTop: 7,
    paddingHorizontal: 20,
    width: 338,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    width: 119,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DFDFDF',
    alignSelf: 'center',
    textAlign: 'center',
  },
})
