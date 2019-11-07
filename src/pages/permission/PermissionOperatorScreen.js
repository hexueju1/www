'use strict'

/**
 *
 * @format
 * @flow
 */

import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import TabHeader from '../../common/TabHeader'

export default class PermissionOperatorScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TabHeader text="用户信息收集授权协议" />
        <ScrollView>
          <View style={styles.topcontent}>
            <Text>
              【特别提醒】{'\n'}{'\n'}
              &emsp;&emsp;为了保障您的合法权益,在您确认签署授权书之前,请您务必仔细阅读授权书的所有条款,充分理解条款内容,并严格遵守授权书。授权书以数据电文形式订立,一旦您在线确认授权书,即视为您已充分理解《授权书》所有条款的含义及相应的法律后果,并同意接受所有授权书条款的约束。{'\n'}
              &emsp;&emsp;《授权书》是授权人向被授权人做出的单方承诺,效力具有独立性,不因《个人消费贷款合同》或其他文件任何条款的无效而无效。即使您的贷款申请未被审核通过,授权书各项授权的有效性不受影响。{'\n'}
              &emsp;&emsp;被授权人承诺:将严格遵照相关法律法规及监管规定,在用户授权范围内谨慎使用被授权信息并严格保密。可查询和使用信用数据期间,不应超过授权书授权期限结束之日。被授权人超出授权范围或期限查询的一切后果及法律责任由被授权人承担。{'\n'}{'\n'}
              &emsp;&emsp;一、个人信息采集及使用通用授权书:{'\n'}{'\n'}
              &emsp;&emsp;1、个人信息,指您的如下信息:(1)姓名、出生日期、身份证件号码、住址、电话号码、肖像、等个人基本信息。{'\n'}
              &emsp;&emsp;(1)借款申请信息、借款合同信息、还款行为信息、负债信息、借款逾期信息、偿债履约能力判断信息、涉讼信息、行政处罚信息、违法犯罪信息等个人正常信用信息及不良信用信息。{'\n'}
              &emsp;&emsp;您已经充分理解并知晓:前述不良信用信息一旦记录在第三方机构的信息数据库中,有可能会对您日后的经济活动产生不同程度的不良影响。{'\n'}
              &emsp;&emsp;(2)设备信息、社交数据、阅读数据、上网浏览/搜索数据、所用应用程序的账号信息、使用某项服务的时间地点信息、联系人信息(含通讯录信息、通话记录信息以及您在申请服务过程中提交的联系人信息等)、消费数据(含近期交易笔数、交易金额及消费行为评分数据等)等个人行为特征数据{'\n'}
              &emsp;&emsp;(3)其他任何与您有关联的信息,但法律、法规、监管政策禁止的除外。 {'\n'}
              &emsp;&emsp;2、第三方,指与被授权人或您有直接或间接关联的如下主体或机构:{'\n'}
              &emsp;&emsp;(1)被授权人关联方、为被授权人提供必要技术和服务的合作方,以及与被授权人合作从事信贷业务的金融机构或互联网金融公司{'\n'}
              &emsp;&emsp;(2)依法存有您某方面个人信息的其他机构,包括但不限于法院、公积金、社保、税务、民政、物流、通信运营商、电子商务平台、电子认证服务提供者、互联网平台等机构或主体。{'\n'}{'\n'}
              &emsp;&emsp;二、授权内容{'\n'}{'\n'}
              &emsp;&emsp;因本人向聚宝盆及其运营的网站及其合作方申请消费贷款,基于业务的需要,本人现同意向（聚宝盆及其合作从事信贷业务的金融机构或互联网金融公司）(以下称"被授权人")及第三方郑重授权如下:{'\n'}
              &emsp;&emsp;1、同意被授权人及第三方在办理下列业务(下称"授权用途")时查询、收集或使用本人的个人信息:{'\n'}
              &emsp;&emsp;(1)审核本人通过被授权人或第三方申请的贷款;{'\n'}
              &emsp;&emsp;(2)对已发放的个人信贷进行贷后风险管理及催收;{'\n'}
              &emsp;&emsp;(3)出于电子签名方面的需要进行必要的身份注册及认证;{'\n'}
              &emsp;&emsp;(4)依法或经有权部门要求向第三方提供综合授权书，本人的贷款申请及个人信息转交至被授权人的其他合作方(包括但不限于相关的聚宝盆及其合作从事信贷业务的金融机构或互联网金融公司、消费金融公司、信托公司或小额贷款公司等),该种情形下被授权人及其前述新合作方有权直接使用 《个人授权书》 项下已查得的本人的个人征信信息,并有权将最终的借贷信息(含不良信息)上报被授权人关联方、为被授权人提供必要技术和服务的合作方,以及与被授权人合作从事信贷业务的金融机构或互联网金融公司{'\n'}{'\n'}
              &emsp;&emsp;三、授权期限{'\n'}{'\n'}
              &emsp;&emsp;自本人作出本授权承诺之日起,至本人在被授权人处所有业务终结之日止。 本人知悉并同意:本人在被授权人和/或其合作方处有借款额度或授信但无借款余额的情况下,本人与被授权人的业务关系仍然存续,被授权人仍有权向第三方查询、打印、保存或上报本人的基本信息和信用信息。{'\n'}{'\n'}
              &emsp;&emsp;四、本人已认真阅读，同意授权勾选电子授权协议书，本授权协议书自动生成。{'\n'}{'\n'}
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
