'use strict'

import React, { PureComponent, Component } from 'react'
import { StyleSheet, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native'
import { color, size } from '../common/MyStyle'
import { Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'

class SettingItemTextTopDown extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[this.props.style, { paddingHorizontal: 10 }]}
        activeOpacity={0.5}
        underlayColor={color.item_pressed}
        onPress={this.props.onPress}
      >
        <View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={[this.props.TextStyle, { fontSize: size.font_big , color :color.hint}]}>{this.props.title}</Text>
            <Text style={[this.props.TextStyle, { fontSize: size.margin_border , fontWeight:'bold'}]}>{this.props.money}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = SettingItemTextTopDown
