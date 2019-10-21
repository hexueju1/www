import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { px, sp } from '../utils/Device'
import { endpoint, images } from '../common/Constants'

class BorrowList extends Component {
  static statusText = ''
  static defaultProps = {
    // 返回默认的一些属性值
    defaultColor_time: '#ECAC3A',
    apply_borrow: '',
    borrow_days: '',
    setitem: ['123', '123'],
  }
  static PropTypes = {
    setitem: PropTypes.array.isRequired,
  }
  render() {
    const { setitem } = this.props
    switch (setitem.apply_status) {
      case '0':
        statusText = '订单审核中'
        setitem.check_time = ''
        break
      case '1':
        statusText = '审核通过'
        break
      case '2':
        statusText = '审核拒绝'
        setitem.check_time = ''
        break
    }
    if (setitem.apply_status == '1') {
      switch (setitem.status) {
        case '0':
          statusText = '订单放款中'
          break
        case '1':
          statusText = '未到还款日'
          break
        case '2':
          statusText = '账单已还清'
          break
        case '3':
          statusText = '账单已逾期'
          break
        case '4':
          statusText = '订单续期中'
          break
        case '5':
          statusText = '已到还款日'
          break
      }
    }
    return (
      <TouchableWithoutFeedback style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={this.props.onPress}>
        <View>
          {/* <Text>{setitem.titgoods_namele}</Text> */}
          <View style={styles.datestyle}>
            <Text style={{ alignSelf: 'center' }}>{setitem.create_time.substr(0, 10)}</Text>
            <Image style={styles.pic_style} source={images.successed} />
          </View>
          <View style={styles.bodystyle}>
            <View style={styles.content}>
              {/* 
              <Text>{setitem.status}</Text>
               */}
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.left}>
                  <Text style={styles.textstyle}>借款金额</Text>
                  <Text style={{ color: '#F8A900', fontWeight: 'bold', fontSize: sp(22), paddingLeft: px(20), paddingTop: px(10) }}>
                    ¥{setitem.apply_borrow}
                  </Text>
                </View>
                <View style={{ width: px(1), height: px(46), backgroundColor: '#F0F0F0', marginTop: px(29) }}></View>
                <View style={styles.right}>
                  <Text style={styles.textstyle}>借款天数</Text>
                  <Text style={{ color: '#ABABAB', fontSize: sp(22), paddingLeft: px(55), paddingTop: px(10) }}>{setitem.borrowing_days}</Text>
                </View>
              </View>
              <View style={styles.bottom}>
                <Image style={{ margin: px(7), width: px(27), height: px(30) }} source={images.small_payoff} />
                <Text style={{ fontSize: sp(16), alignSelf: 'center' }}>{statusText}</Text>
                <Text style={{ color: '#666666', fontSize: sp(10), alignSelf: 'center', marginLeft: px(50) }}>还款时间</Text>
                <Text style={{ color: '#666666', fontSize: sp(10), alignSelf: 'center', marginLeft: px(10) }}>
                  {setitem.expiration_time.substr(0, 10)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

var styles = StyleSheet.create({
  datestyle: {
    width: px(106),
    height: px(38),
    backgroundColor: '#F8A900',
    borderTopRightRadius: px(19),
    borderBottomRightRadius: px(19),
    flexDirection: 'row',
  },
  pic_style: {
    width: px(20),
    height: px(20),
    alignSelf: 'center',
    marginLeft: px(5),
  },
  bodystyle: {
    height: px(180),
    borderLeftWidth: px(2),
    borderLeftColor: '#F8A900',
    marginLeft: 35,
    paddingTop: 20,
    paddingLeft: 20,
  },
  content: {
    width: px(286),
    height: px(126),
    borderRadius: 8,
    backgroundColor: '#FDFDFD',
  },
  left: {
    width: px(162),
    height: px(83),
    paddingTop: 15,
  },
  right: {
    height: px(83),
    paddingTop: 15,
  },
  bottom: {
    borderTopWidth: px(1),
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
  },
  textstyle: {
    fontSize: sp(12),
    color: '#0F0F0F',
    marginLeft: px(34),
  },
})

module.exports = BorrowList
