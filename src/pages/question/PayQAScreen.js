'use strict'

/**
 *
 * @format
 * @flow
 */

import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import TabHeader from '../../common/TabHeader'

export default class PayQAScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="借款问题" />
        <ScrollView>
          <View style={styles.topcontent}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>如何还款？</Text>
              {'\n'}
              支持主动还款和自动还款两种方式。A：主动还款：点击“快速还款”选择一笔正在进行中的账单，点击“立即还款”按照提示完成还款操作。B：自动还款：到期还款日当天，根据您设置的还款账户自动进行扣款，请确保还款期间绑定的作为还款用途的银行账户不会出现挂失、冻结、余额不足等问题，以便按期还款。
              {'\n'}
              {'\n'}
              <Text style={{ fontWeight: 'bold' }}>自动还款失败怎么办？</Text>
              {'\n'} 到期还款日当天自动扣款失败，系统会发送扣款失败提醒短信，请留意短信并及时通过app主动还款。
            </Text>
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
  topcontent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: px(23),
    paddingHorizontal: px(15),
  },
})
