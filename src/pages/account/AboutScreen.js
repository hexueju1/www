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
  Linking,
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
import UpdateManager from '../../common/UpdateManager'
import SettingItem from '../../components/SettingItem'
import { px, sp } from '../../utils/Device'
import DeviceInfo from 'react-native-device-info'

export default class AboutScreen extends BaseScreen {
  constructor(props) {
    super(props)
    /**
     * 不需要网络请求
     *
     * 不要单独给我的客服建立一个页面，合并为一个页面即可
     */
    this.state = {
      name: '**',
      version: '1.1.10',
      tel: '0512-7493958',
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="关于我们"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <ScrollView>
          <Text>{this.state.status}</Text>
          <Image style={{ width: px(61), height: px(61), alignSelf: 'center' }} source={images.about_icon} />
          <Text style={styles.value}>{this.state.name}</Text>
          {/* <Text style={styles.value}>{this.state.version}</Text> */}
          <View style={styles.list}>
            <SettingItem
              imageUrl={images.about_us_one}
              text={'版本号'}
              rightText={'V_' + UpdateManager.versionName + '(' + '' + UpdateManager.versionCode + ')'}
              onPress={() => {}}
              hideImage
            />

            <SettingItem
              imageUrl={images.about_us_two}
              text={'联系客服'}
              rightText={'客服电话：' + this.state.tel}
              onPress={() => {
                Linking.openURL('tel:' + this.state.tel)
              }}
              hideImage
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    DeviceInfo.getApplicationName().then((appName) => {
      this.setState({
        name: appName,
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
  value: {
    alignSelf: 'center',
    marginTop: px(10),
    marginBottom: px(10),
  },
  list: {
    marginHorizontal: px(19),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
  },
})
