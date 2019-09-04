'use strict'

import React, { PureComponent, Component } from 'react'
import { StatusBar, TouchableOpacity, TouchableHighlight, View, Image, Platform } from 'react-native'

/**
 * 沉浸式不要用
 * 只是用来控制高度
 */
class MyStatusBar extends Component {
  render() {
    if (Platform.OS === 'android') {
      return <View style={[{ alignItems: 'center', height: StatusBar.currentHeight }, this.props.style]} />
    } else {
      return <View />
    }
  }
}

module.exports = MyStatusBar
