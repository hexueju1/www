'use strict'

/**
 *
 * 获取验证码控件
 *
 */
import React, { Component } from 'react'
import { DeviceEventEmitter, StyleSheet, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native'
import { CheckBox, Body, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import { color, size } from '../common/MyStyle'
import CoinConfig from '../common/CoinConfig'
import { event, localStore, endpoint } from '../common/Constants'
import { showToast } from '../utils/MyToastUtils'
import MarketsManager from '../common/MarketsManager'

class HomeItem extends Component {
  prevItem = undefined
  priceColor = color.home_data_text
  constructor() {
    super()
    this.state = {
      running: false,
    }
  }

  static defaultProps = {
    // 返回默认的一些属性值
    item: {},
    onPress() {},
    favorite: false,
  }

  getChangeStyle(value) {
    let base = styles.change_base
    let ex = value < 0 ? styles.change_down : styles.change_up
    return [base, ex]
  }

  getChangeValue(value) {
    let txt = value < 0 ? (value * 100).toFixed(2) + '%' : '+' + (value * 100).toFixed(2) + '%'
    return txt
  }

  render() {
    let item = this.props.item

    if (this.prevItem) {
      // if (item.pair == 'BTC-USDT') {
      //   console.log('this.prevItem.close' + this.prevItem.close)
      //   console.log('item.close' + item.close)
      // }
      if (this.prevItem.close > item.close) {
        this.priceColor = color.down
      } else if (this.prevItem.close < item.close) {
        this.priceColor = color.up
      } else {
      }
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.priceColor = color.home_data_text
        this.setState({
          running: false,
        })
        clearTimeout(this.timeout)
      }, 800)
    }

    this.prevItem = item
    return (
      <TouchableOpacity
        style={{ padding: 4 }}
        onPress={() => {
          this.props.onPress()
        }}
      >
        {/* 从左到右 */}
        <View style={styles.list_row}>
          <View style={{ flexDirection: 'row' }}>
            {this.props.favorite ? (
              <TouchableOpacity style={{alignItems:'center'}}
                onPress={() => {
                  MarketsManager.toggleFavorite(item.pair)
                  this.setState({
                    favorite: true,
                  })
                }}
              >
                <Image
                  style={{ width: 30, height: 30, marginTop: 4 ,marginRight:4}}
                  source={MarketsManager.isFavorite(item.pair) ? require('../images/trade/star-fill.png') : require('../images/trade/star.png')}
                />
              </TouchableOpacity>
            ) : null}
            <View style={styles.coin_column}>
              <Text style={styles.coin_common}>{item.pair.replace('-', ' / ')}</Text>
              <Text style={styles.coin_value}>{CoinConfig.getStringWithPair(item.pair, item.volume)}</Text>
            </View>
          </View>
          <View style={styles.coin_column_right}>
            <View style={{ flexDirection: 'row' }}>
              {this.priceColor == color.home_data_text ? null : this.priceColor == color.up ? (
                <Image style={styles.up_down_image} source={require('../images/home/ic_home_rise.png')} />
              ) : (
                <Image style={styles.up_down_image} source={require('../images/home/ic_home_fall.png')} />
              )}
              <Text style={[styles.coin_common, { color: this.priceColor }]}>{'  ' + CoinConfig.getStringWithPair(item.pair, item.close)}</Text>
            </View>
            <Text style={this.getChangeStyle(item.change)}>{this.getChangeValue(item.change)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {}

  componentWillUnmount() {
    console.log('componentWillUnmount HomeItem')
    this.timeout && clearTimeout(this.timeout)
  }
}

var styles = StyleSheet.create({
  list_row: {
    flexDirection: 'row',
    height: 66,
    borderStyle: 'solid',
    borderColor: color.border_line,
    borderBottomWidth: 1,
    // borderBottomColor: '#8b8b8b',
    borderBottomColor: color.divide_bg,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  coin_column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coin_column_right: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  coin_common: {
    fontFamily: 'PingFangSC-Medium',
    color: color.home_data_text,
    fontSize: 18,
  },
  coin_value: {
    fontSize: 16,
    color: color.home_data_text,
  },
  change_base: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 5,
    paddingLeft: 5,
    color: '#ffffff',
    textAlign: 'center',
    borderRadius: 4,
    fontSize: 14,
  },
  change_up: {
    backgroundColor: color.up,
  },
  change_down: {
    backgroundColor: color.down,
  },
  up_down_image: { width: 12, height: 18, marginTop: 3 },
})

module.exports = HomeItem
