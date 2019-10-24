import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { color } from './MyStyle'
import { px, getStatusBarHeight, sp } from '../utils/Device'
import { images } from './Constants'
const TabHeaderTextPaddingTop = px(10) // 字上方间距
const TabHeaderTextPaddingButtom = px(12) // 字下方间距

class TabHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TabHeight: getStatusBarHeight(),
    }
  }
  componentDidMount() {}
  render() {
    let {
      backGround, // 导航栏背景颜色
      text,
    } = this.props
    return (
      <View
        style={[
          styles.constainer,
          {
            paddingTop: this.state.TabHeight + TabHeaderTextPaddingTop,
            backgroundColor: backGround || color.primary_text,
          },
        ]}
      >
        <Text style={styles.HeaderText}>{text}</Text>
        <TouchableOpacity
          style={{ left: 0, position: 'absolute', top: this.state.TabHeight + TabHeaderTextPaddingTop - 4 }}
          // onPress={this.props.onPress}
          onPress={this.props.onPress == null ? this.gotoBack : this.props.onPress}
        >
          <Image style={styles.LeftImage} source={images.header_back}></Image>
        </TouchableOpacity>
      </View>
    )
  }
  gotoBack = () => {
    this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  constainer: {
    paddingBottom: TabHeaderTextPaddingButtom,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: sp(16),
    color: color.header_text,
  },
  LeftImage: {
    width: px(48),
    height: px(27),
  },
})

export default withNavigation(TabHeader)
