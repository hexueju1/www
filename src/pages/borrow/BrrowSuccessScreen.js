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
export default class BorrowSuccessScreen extends BaseScreen {
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
        <TabHeader text="借款" />
        <ScrollView>
          <View style={styles.content}>
            <Image style={{ width: px(60), height: px(60), marginTop: px(16) }} source={images.sucess} />
            <Text style={{ marginTop: px(11) }}>借款成功</Text>
            <View style={styles.box}>{list}</View>
            <Button
              disabled={this.state.button_status}
              style={[styles.button, { backgroundColor: this.state.allow_status === false ? '#ABABAB' : '#E7912D' }]}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <Text style={{ fontSize: px(16) }}>查看借款进度</Text>
            </Button>
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
  line: {
    height: px(1),
    width: px(338),
    backgroundColor: '#E9ECEF',
  },
  permission: {
    height: px(20),
    flexDirection: 'row',
    marginLeft: px(10),
    marginTop: px(15),
  },
  button: {
    marginTop: px(11),
    width: px(300),
    height: px(44),
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
