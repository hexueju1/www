'use strict'

import React, { PureComponent, Component } from 'react'
import { StyleSheet, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native'
import { color, size } from '../common/MyStyle'
import { Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'

class SettingItem extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[this.props.style, { paddingHorizontal: 10 }]}
        activeOpacity={0.5}
        underlayColor={color.item_pressed}
        onPress={this.props.onPress}
      >
        <View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {this.props.imageUrl ? (
                <Image style={{ width: 20, height: 20, marginRight: 10 }} source={this.props.imageUrl} />
              ) : null}
              <Text style={[this.props.TextStyle, { fontSize: size.font_big }]}>{this.props.text}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[this.props.TextStyle, { fontSize: size.font_big }]}>{this.props.rightText}</Text>

              <Image
                style={{ width: 10, height: 20, margin: 14 }}
                source={this.props.hideImage ? undefined : require('../images/setting_item_right.png')}
              />
            </View>
          </View>
          <View style={{ height: this.props.hideDivide ? 0 : 1, backgroundColor: color.divide_line }} />
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = SettingItem
