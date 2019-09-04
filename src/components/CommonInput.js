'use strict';

import React, { PureComponent, Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import {
  Isao,
  Sae,
  Kaede,
  Hoshi,
  Jiro,
  Akira,
  Madoka
} from 'react-native-textinput-effects';
import { color, size } from '../common/MyStyle';

class CommonInput extends Component {

  static defaultProps = { // 返回默认的一些属性值
    value: '',
    label: '',
    onChangeText(text) {}
  };

  render() {
    return (
      <Hoshi
        style={[this.props.style, { marginTop: 10 }]}
        label={this.props.label}
        value={this.props.value}
        onChangeText={(text) => this.props.onChangeText(text)}
        borderColor={color.up}
        borderHeight={size.border_height}
      />
    );
  }
}
module.exports = CommonInput;
