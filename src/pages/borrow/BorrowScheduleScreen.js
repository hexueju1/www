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

let Info = [
  {
    title: '借款金额',
    desc: '2,000.00',
  },
  {
    title: '预计到账时间',
    desc: '30分钟内到账',
  },
  {
    title: '收款账户',
    desc: '中国银(123)',
  },
  {
    title: '贷款人',
    desc: '闪贷',
  },
]
export default class BorrowScheduleScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let list = []
    for (let i in Info) {
      var item = (
        <View key={i} style={[styles.row, styles.list_item]}>
          <Text style={styles.list_item_title}>{Info[i].title}</Text>
          <Text style={styles.list_item_desc}>{Info[i].desc}</Text>
        </View>
      )
      list.push(item)
    }
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="借款进度"
          onPress={() => {
            this.props.navigation.goback()
          }}
        />
        <ScrollView>
          <View style={styles.content}>
            <Image style={{ width: px(60), height: px(60), marginTop: px(16) }} source={images.acceptance} />
            <Text style={{ marginTop: px(11) }}>借款受理中</Text>
            <View style={styles.box}>{list}</View>
          </View>
        </ScrollView>
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
