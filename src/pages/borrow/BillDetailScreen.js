'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { showToast } from '../../utils/MyToastUtils'
import { Button, Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import TabHeader from '../../common/TabHeader'
import { endpoint, images } from '../../common/Constants'
import { color } from '../../common/MyStyle'
import MyHttpUtils from '../../utils/MyHttpUtils'

export default class BillDetailScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      money: '2,000.00',
      allow_status: false,
      button_status: true,
      Info: [
        {
          title: '借多久',
          desc: '',
        },
        {
          title: '收款账户',
          desc: '',
        },
        {
          title: '借款人',
          desc: '',
        },
        {
          title: '证件号',
          desc: '',
        },
        {
          title: '借款用途',
          desc: '',
        },
        {
          title: '贷款人',
          desc: '',
        },
      ],
    }
  }

  allow_pic = () => {
    this.setState({ allow_status: !this.state.allow_status })
    this.setState({ button_status: !this.state.button_status })
  }

  change_Info = (index, value) => {
    var items = this.state.Info
    items[index].desc = value
    this.setState({
      Info: items,
    })
  }

  request = () => {
    MyHttpUtils.fetchRequest('post', endpoint.borrow.borrow, { data: '' }).then((responseJson) => {
      this.props.navigation.navigate('BorrowSuccess')
    })
  }

  render() {
    let list = []
    for (let i in this.state.Info) {
      var item = (
        <View key={i} style={[styles.row, styles.list_item]}>
          <Text style={styles.list_item_title}>{this.state.Info[i].title}</Text>
          <Text style={styles.list_item_desc}>{this.state.Info[i].desc}</Text>
        </View>
      )
      list.push(item)
    }
    return (
      <View style={styles.main_container}>
        <TabHeader
          text="借款"
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.box}>
              {/* 各种服务费 */}
              <View style={styles.tip}>
                <Text style={styles.text}>平台管理费&nbsp;&nbsp;&nbsp;&nbsp;500</Text>
                <Text style={styles.text}>通道管理费&nbsp;&nbsp;&nbsp;&nbsp;200</Text>
                <Text style={styles.text}>资金管理费&nbsp;&nbsp;&nbsp;&nbsp;100</Text>
              </View>

              {/* 信息列表 */}
              <Text style={{ fontSize: sp(14), color: '#ABABAB', marginLeft: px(10), marginTop: px(18) }}>借款总额（元）</Text>
              <Text style={{ fontSize: sp(38), color: '#0F0F0F', marginLeft: px(10), marginTop: px(6), marginBottom: px(8), fontWeight: 'bold' }}>
                {this.state.money}
              </Text>
              {list}
              <View style={styles.line}></View>

              {/* 承诺协议 */}
              <View style={styles.permission}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.allow_pic()}>
                  <Image
                    source={this.state.allow_status === false ? images.unallow : images.allow}
                    style={{ width: px(16), height: px(16), marginRight: px(6) }}
                  />
                  <Text style={{ color: '#C6C9CC', fontSize: sp(12) }}>我已阅读并同意</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showToast('协议')
                  }}
                >
                  <Text style={{ color: '#666666', fontSize: sp(12) }}>《用户信息手机授权协议》</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 按钮 */}
            <Button
              disabled={this.state.button_status}
              style={[styles.button, { backgroundColor: this.state.allow_status === false ? '#ABABAB' : color.primary_bg }]}
              onPress={() => this.request()}
            >
              <Text style={{ fontSize: px(16) }}>下一步</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    MyHttpUtils.fetchRequest('post', endpoint.borrow.before_borrow).then((responseJson) => {
      this.setState({
        money: responseJson.data.product.money,
      })
      this.change_Info(0, responseJson.data.product.days + '天')
      this.change_Info(1, responseJson.data.user.bank_name + '(' + responseJson.data.user.card_number.substr(15, 4) + ')')
      this.change_Info(2, responseJson.data.user.name.substr(0, 1) + '*')
      this.change_Info(3, responseJson.data.user.card_number.substr(0, 3) + '************' + responseJson.data.user.card_number.substr(15, 4))
      this.change_Info(4, '日常消费')
      this.change_Info(5, responseJson.data.product.goods_name)
    })
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
    height: px(390),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    marginTop: px(41),
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
    flex: 2,
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
    marginTop: px(74),
    marginBottom: px(33),
    width: px(300),
    height: px(44),
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tip: {
    width: px(130),
    height: px(65),
    backgroundColor: color.primary_bg,
    borderTopLeftRadius: px(49),
    borderBottomLeftRadius: px(49),
    position: 'absolute',
    right: px(0),
    top: px(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FDFDFD',
    fontSize: px(12),
  },
})
