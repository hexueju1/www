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

export default class AboutScreen extends BaseScreen {
  constructor(props) {
    super(props)
    /**
     * 不需要网络请求
     *
     * 不要单独给我的客服建立一个页面，合并为一个页面即可
     */
    this.state = {
      name: '聚宝盆',
      version: '123',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="关于我们" />
        <Text>{this.state.status}</Text>
        <View style={styles.line}>
          <Text style={styles.value}>{this.state.name}</Text>
          <Text style={styles.value}>{this.state.version}</Text>
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
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
