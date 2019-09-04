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
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import BorrowTab from './BorrowTab'
import MyStatusBar from '../../components/MyStatusBar'
import { color } from '../../common/MyStyle'
export default class RepaymentScreen extends BaseScreen {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <MyStatusBar style={{ backgroundColor: color.white }} />
        <Tabs>
          <Tab heading="借款记录">
            <BorrowTab type={1} />
          </Tab>
          <Tab heading="申请记录">
            <BorrowTab type={0} />
          </Tab>
        </Tabs>
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
})
