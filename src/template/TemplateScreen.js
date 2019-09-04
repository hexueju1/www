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
import BaseScreen from '../components/BaseScreen'
import { color, size, layout, style } from '../common/MyStyle'
import { LOG } from '../utils/MyDebugUtils'
import MyHttpUtils from '../utils/MyHttpUtils'
import { showToast } from '../utils/MyToastUtils'
import MyStoreManager from '../common/MyStoreManager'
import LoginManager from '../common/LoginManager'
import { event, localStore, endpoint } from '../common/Constants'
import DismissKeyboardHOC from '../components/DismissKeyboardHOC'
export default class TemplateScreen extends BaseScreen {
  static navigationOptions = {
    title: 'Template',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <SafeAreaView style={styles.main_container} />
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
