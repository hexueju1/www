/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  TouchableWithoutFeedback,
  Clipboard,
  Alert,
  Button,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { px, getStatusBarHeight, sp } from '../utils/Device'
const isAndroid = Platform.OS === 'android'

export default class MyWebView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      TabHeight: getStatusBarHeight(),
    }
  }

  render() {
    const { navigation } = this.props
    const local = navigation.getParam('local', false)
    const title = navigation.getParam('title', false)
    let url = navigation.getParam('url', 'index.html')
    if (local) {
      if (isAndroid) {
        url = 'file:///android_asset/' + url
      } else {
        url = './assets/' + url
      }
    }
    // 主界面
    return (
      <SafeAreaView style={[styles.main_container, { paddingTop: this.state.TabHeight }]}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: url }}
          // scalesPageToFit
        />
      </SafeAreaView>
    )
  }
}
var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
})
