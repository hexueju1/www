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

export default class AmountQAScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="额度问题" />
        <ScrollView>
          <View style={styles.topcontent}>
            <Text>
              &emsp;&emsp;请您仔细阅读下列注意事项，并按照说明进行操作，如未按照要求进行操作，将可能会影响您的额度的提升。{'\n'}
              {'\n'}
              &emsp;&emsp;一、请在接下来的操作中的权限申请全部给予允许，若无法通过，请重试或卸载软件后重新安装。{'\n'}
              {'\n'} &emsp;&emsp;二、永久额度
              {'\n'}&emsp;&emsp;提升永久额度，需要通过本人所提交的个人资料来决定，个人资质需要满足相关要求，通过如下条件可以提升个人的综合评分：
              &emsp;&emsp;（a）在同一借贷机构多次申请借款，并且都有按时还清每笔款项，没有产生逾期记录。{'\n'}
              &emsp;&emsp;（b）完善个人信息：如学历学籍、职业信息等个人信息。{'\n'}
              &emsp;&emsp;（c）消费次数和消费的金额越多，从而提升更高的借款额度。{'\n'}
              &emsp;&emsp;（d）消费的产品种类多，比如商场、超市、餐饮店、旅店、旅游等商家。{'\n'}
              &emsp;&emsp;（e）多在网上购物、支付宝转账、取现等方式。{'\n'}&emsp;&emsp;（f）通过使用信用卡消费。 {'\n'}
              &emsp;&emsp;（g）多使用本平台的相关产品，增加使用频率。{'\n'}&emsp;&emsp;（h）绑定本人任何在使用的银行储蓄卡。
              &emsp;&emsp;（i）以上方法仅作参考，如有不便之处敬请指出。{'\n'}
              {'\n'} &emsp;&emsp;三、临时额度{'\n'}
              &emsp;&emsp;提升临时额度，但这些额度并不会永久提升。满足相关条件者即可提升临时额度。{'\n'}
              {'\n'}
              &emsp;&emsp;四、在提交相关信息时，会对您的相关信息进行验证，确保是你本人操作。
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
