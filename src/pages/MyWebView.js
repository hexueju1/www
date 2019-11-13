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
import TabHeader from '../common/TabHeader'
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
    msg_from_webview = (event) => {
      console.log(event)
      this.props.navigation.navigate('HomeMain')
    }
    // 主界面
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader text="还款二维码" />
        <WebView
          originWhitelist={['*']}
          source={{ uri: url }}
          // scalesPageToFit
          onMessage={(event) => {
            this.msg_from_webview(event)
          }}
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
