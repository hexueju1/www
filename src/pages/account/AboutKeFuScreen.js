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
import { endpoint, images } from '../../common/Constants'
import TabHeader from '../../common/TabHeader'
import SettingItem from '../../components/SettingItem'

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
      step: '客服电话：0512-746583',
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="关于我们" />
        <ScrollView>
          <Text>{this.state.status}</Text>
          <Image style={{ width: 61, height: 61, alignSelf: 'center' }} source={images.about_icon} />
          <Text style={styles.value}>{this.state.name}</Text>
          {/* <Text style={styles.value}>{this.state.version}</Text> */}
          <View style={styles.list}>
            <SettingItem imageUrl={images.about_us_two} text={'联系客服'} rightText={this.state.step} onPress={() => {}} hideImage />
          </View>
        </ScrollView>
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
    backgroundColor: '#E9ECEF',
  },
  value: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    marginHorizontal: 19,
    backgroundColor: '#FDFDFD',
    borderRadius: 8,
  },
})
