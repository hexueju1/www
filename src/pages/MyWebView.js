/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, TouchableWithoutFeedback, Clipboard, Alert, Button, TextInput, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
const isAndroid = Platform.OS === 'android'

export default class MyWebView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
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
      <View style={styles.main_container}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: url }}
          // scalesPageToFit
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
  },
})
