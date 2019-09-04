/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { View, Image, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { color, size, layout, style } from '../../common/MyStyle'
import { isDebug, LOG } from '../../utils/MyDebugUtils'
import LocalConfigManager from '../../common/LocalConfigManager'
import MyStatusBar from '../../components/MyStatusBar'

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    title: '借款',
  })

  // props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar backgroundColor={color.primary_bg} barStyle="dark-content" translucent={false} />
      </SafeAreaView>
    )
  }

  componentDidMount() {
    if (isDebug()) {
      setTimeout(() => {
        if (LocalConfigManager.debugScreen) {
          this.props.navigation.navigate(LocalConfigManager.debugScreen)
        }
      }, 300)
    }
  }

  componentWillUnmount() {}
}

var styles = StyleSheet.create({
  main_container: {
    flexDirection: 'column',
  },
})
