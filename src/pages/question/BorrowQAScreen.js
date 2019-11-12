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

export default class BorrowQAScreen extends BaseScreen {
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
              <Text style={{ fontWeight: 'bold' }}>如何借款？</Text>
              {'\n'}
              额度激活成功后，点击“立即借款”进入“我要借款”页面，确认借款金额后，可选择30天随借随还和按月分期借款两种借款方式。当选择30天谁借随还，期限默认为30天，依次选择收款账户、还款账户及借款用途，借款用途请根据实际情况选择，当收款账户为信用卡时借款用途默认为“信用卡代偿”且不可修改，选择完成后点击“下一步”进行借款确认即可。当选择按月分期借款，期限可选，请根据页面提示操作并依次选择收款账户、还款账户及借款用途，借款用途请根据实际情况选择，当收款账户为信用卡时借款用途默认为“信用卡代偿”且不可修改，选择完成后点击“下一步”进行借款确认即可。
              {'\n'}
              {'\n'}
              <Text style={{ fontWeight: 'bold' }}>借款打到哪里？</Text>
              {'\n'} 借款金额会入账到您设置的收款账户（储蓄卡或者信用卡）中。 借款发起后是否可以撤销？ 不能撤销。{'\n'}
              {'\n'} <Text style={{ fontWeight: 'bold' }}>借款多久可以到账？</Text>
              {'\n'}
              成功发起借款后最快秒级到账，入账成功后会有短信通知。如果借款成功发起后，长时间未到账，请在账单中查询借款进度或拨打我们的客服电话咨询。
              {'\n'}
              {'\n'}
              <Text style={{ fontWeight: 'bold' }}>操作借款时间？</Text>
              {'\n'} 借款时间为每天5：00至22:00，后续如有调整请以APP提示信息为准。{'\n'}
              {'\n'} <Text style={{ fontWeight: 'bold' }}>什么是借款当日免息？</Text>
              {'\n'}
              当您选择30天随借随还时，期限为借款日起的30个自然日，计息方式为按日计息，如果借款日（22:00前）进行还款则不收取当日的利息，仅收取借款服务费。
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
