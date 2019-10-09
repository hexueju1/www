'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Button, Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import TabHeader from '../../common/TabHeader'
import { images } from '../../common/Constants'

export default class AccountedScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="借款进度" />
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }
}

var styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E9ECEF',
  },
  content: {
    alignItems: 'center',
  },
  box: {
    width: px(338),
    height: px(177),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    marginTop: px(41),
    paddingTop: px(15),
  },
  row: {
    flexDirection: 'row',
    marginBottom: px(10),
  },
  list_item: {
    marginLeft: px(5),
    marginRight: px(5),
    padding: px(5),
    height: px(30),
  },
  list_item_title: {
    flex: 1,
    fontSize: sp(14),
    color: '#ABABAB',
  },
  list_item_desc: {
    color: '#0F0F0F',
    fontSize: sp(14),
  },
})
