'use strict'

import React, { PureComponent, Component } from 'react'
import { StyleSheet, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native'
import {
  Root,
  ActionSheet,
  Accordion,
  Tab,
  Tabs,
  Container,
  Header,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base'
import { color } from '../common/MyStyle'

/**
 * 暂无数据
 */
class CommonNoData extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', margin: 20 }}>
        {/*<Text>{I18n.t('NODATA')}</Text>*/}
        <Text style={this.props.style}>{this.props.text ? this.props.text : '没有更多了'}</Text>
      </View>
    )
  }
}

module.exports = CommonNoData
