'use strict'

/**
 *
 * 获取验证码控件
 *
 */
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, TextInput } from 'react-native'
import { CheckBox, Body, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import { color, size } from '../common/MyStyle'
import MyHttpUtils from '../utils/MyHttpUtils'
import { showToast } from '../utils/MyToastUtils'

class CountDownInput extends Component {
  // 最大读秒数
  MAX_SECONDS = 60

  constructor() {
    super()
    this.state = {
      enable: true,
      seconds: this.MAX_SECONDS,
      // 是否正在倒计时
      counting: false,
    }
  }

  static defaultProps = {
    // 返回默认的一些属性值
    value: '',
    label: '获取验证码',
    placeholder: '请输入验证码',
    endpoint: '',
    onPress() {},
    onChangeText(text) {},
  }

  clickSendCode = () => {
    if (!this.props.onPress()) {
      return
    }
    if (this.state.enable) {
      this.setState({ enable: false })
      MyHttpUtils.fetchRequest('post', this.props.endpoint, this.props.httpParams)
        .then((responseJson) => {
          showToast('验证码已发送，请注意查收')
          // 开始倒计时
          this.setState({ counting: true })
          let that = this
          this.interval = setInterval(() => {
            // 60秒已结束
            if (this.state.seconds <= 0) {
              this.setState({
                counting: false,
                enable: true,
                seconds: that.MAX_SECONDS,
              })
              that.interval && clearInterval(that.interval)
              return
            }
            this.setState({
              seconds: this.state.seconds - 1,
            })
          }, 1000)
        })
        .catch((error) => {
          // showToast('验证码发送失败')
          this.setState({ enable: true })
        })
    }
  }

  render() {
    return (
      <Item picker>
        <TextInput
          placeholder={this.props.placeholder}
          keyboardType="numeric"
          style={{ flex: 1, height: 49 }}
          value={this.props.value}
          onChangeText={(text) => this.props.onChangeText(text)}
        />
        <Button
          disabled={!this.state.enable}
          transparent
          onPress={() => {
            this.clickSendCode()
          }}
        >
          <Text style={{}}>{this.state.counting ? this.state.seconds + '秒' : this.props.label} </Text>
        </Button>
      </Item>
    )
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }
}
module.exports = CountDownInput
