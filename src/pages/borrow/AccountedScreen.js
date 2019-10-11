'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity, Image, Linking, SettingItem } from 'react-native'
import { Button, Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import TabHeader from '../../common/TabHeader'
import { images } from '../../common/Constants'

export default class AccountedScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      money: '2,000.00',
    }
  }

  render() {
    let invoice = [
      { id: 111, content: '完成申请', ctime: '2017-1-11 17:59' },
      { id: 222, content: '申请成功，银行受理中', ctime: '2017-1-10 17:59' },
      { id: 222, content: '借款成功', ctime: '2017-1-10 17:59' },
    ]
    let items = []
    invoice.map((el, index) => {
      let colorValue = index === 0 ? '#E7912D' : '#888'
      let backgroundColor = index === 0 ? '#E7912D' : '#e0e0e0'
      items.push(
        <View style={styles.expressItem} key={index}>
          <View style={styles.expressRightFirst}>
            <View style={styles.process}>
              <Text style={{ color: colorValue, fontSize: 14 }}>{el.content}</Text>
              <Text style={{ color: colorValue, fontSize: 12 }}>{el.ctime}</Text>
            </View>
          </View>
          <View style={[styles.expressLeft, { backgroundColor: backgroundColor }]} />
        </View>,
      )
    })
    return (
      <View style={styles.main_container}>
        <TabHeader text="借款进度" />
        <View style={styles.content}>
          <Text style={{ color: '#666666', fontSize: sp(18), marginTop: px(10) }}>已到账</Text>
          <Text style={{ color: '#0F0F0F', fontSize: sp(38), marginTop: px(16), fontWeight: '400' }}>{this.state.money}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={{ color: '#ABABAB', fontSize: sp(14), margin: px(18) }}>交易进度</Text>
          <View style={styles.step}>{items}</View>
        </View>
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
    height: px(128),
    backgroundColor: '#FDFDFD',
  },
  bottom: {
    marginTop: px(8),
    height: px(185),
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
  },
  step: {
    marginLeft: 10,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: 10,
  },
  process: {
    paddingVertical: 10,
    flexDirection: 'column',
    paddingRight: 20,
  },
  expressRightFirst: {
    width: Dimensions.get('window').width,
    paddingLeft: 25,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    flexDirection: 'column',
  },
  expressItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    width: Dimensions.get('window').width,
  },
  expressLeft: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    right: Dimensions.get('window').width + 4,
    top: 20,
  },
})
