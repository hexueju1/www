'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { TouchableOpacity, TextInput, Image, StyleSheet, View, SafeAreaView } from 'react-native'
import { Button, Text } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import CountDownInput from '../../components/CountDownInput'
import { isDebug } from '../../utils/MyDebugUtils'
import LoginManager from '../../common/LoginManager'
import { launchCamera, uploadFileToOss } from '../../utils/MyPhotoSelectUtils'

export default class BankCardScreen extends BaseScreen {
  // 发送验证码后获得
  serial_number = ''

  constructor(props) {
    super(props)
    this.state = {
      name: '**',
      bankCard: isDebug() ? '6214851211358317' : '',
      bankName: '**',
      tel: '',
      // 验证码
      code: '',
      uploadProgress: 0,
      idcardPath: '',
    }
  }

  autoUpload = () => {
    launchCamera().then((source) => {
      MyHttpUtils.fetchRequest('post', endpoint.common.oss_signature).then((responseJson) => {
        uploadFileToOss(
          responseJson,
          '/bank/',
          source.uri,
          (progress) => {
            this.setState({
              uploadProgress: progress,
            })
          },
          (urlPath) => {
            console.log('urlPath = ' + urlPath)
            this.setState({
              idcardPath: urlPath,
            })
            MyHttpUtils.fetchRequest('post', endpoint.risk.check_bankcard, { card_url: this.state.idcardPath }).then((responseJson) => {
              this.setState({
                bankCard: responseJson.data.card_number,
                bankName: responseJson.data.bank_name,
              })
            })
          },
          '_bank.jpg',
        )
      })
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <TabHeader
          text="绑定银行卡"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
        <View style={[styles.toptext, { marginTop: px(32) }]}>
          {/* 持卡人 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>持卡人</Text>
            <Text style={[styles.textstyle_right, { color: '#0F0F0F' }]}>{this.state.name}</Text>
          </View>

          {/* 银行卡 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>银行卡</Text>
            <TextInput
              editable={false}
              style={styles.textstyle_right}
              placeholder={'点击拍摄银行卡获取卡号'}
              keyboardType="numeric"
              placeholderTextColor={'#ABABAB'}
              value={this.state.bankCard}
              // secureTextEntry={true}
              onChangeText={(text) => this.setState({ bankCard: text })}
            />
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {
                this.autoUpload()
              }}
            >
              <Image style={{ width: px(26), height: px(22), alignSelf: 'center' }} source={images.bank_camera} />
            </TouchableOpacity>
          </View>

          {/* 所属银行 */}
          <View style={[styles.text_one, { borderColor: '#F3F3F3' }]}>
            <Text style={styles.textstyle}>所属银行</Text>
            <Text style={styles.textstyle_right}>{this.state.bankName}</Text>
          </View>
        </View>

        <View style={[styles.toptext, { marginTop: px(10), height: px(90) }]}>
          {/* 预留号码 */}
          <View style={styles.text_one}>
            <Text style={styles.textstyle}>预留手机号</Text>
            {/* <Text style={styles.textstyle_right}>{this.state.tel}</Text> */}
            <TextInput
              style={styles.textstyle_right}
              placeholder={'预留号码'}
              placeholderTextColor={'#ABABAB'}
              value={this.state.tel}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ tel: text })}
            />
          </View>

          {/* 验证码 */}
          <View style={{ marginLeft: px(-18) }}>
            <CountDownInput
              endpoint={endpoint.bank.send_sms}
              style={{ borderBottomColor: '#F3F3F3' }}
              placeholder={'请输入动态密码'}
              placeholderTextColor={'#ABABAB'}
              label={'获取密码'}
              labelColor={'#E7912D'}
              value={this.state.code}
              keyboardType="numeric"
              httpParams={{
                card: this.state.bankCard,
                mobile: this.state.tel,
              }}
              onChangeText={(text) => this.setState({ code: text })}
              onPress={() => {
                if (this.state.tel === '') {
                  showToast('请输入预留号码')
                  return
                }
                return true
              }}
              onSuccess={(responseJson) => {
                console.log('fuck here')
                this.serial_number = responseJson.data.MCHNTSSN
                console.log(this.serial_number)
              }}
            />
          </View>
        </View>
        <Button
          style={styles.button}
          onPress={() => {
            // 判断输入
            MyHttpUtils.fetchRequest('post', endpoint.bank.bind, {
              card: this.state.bankCard,
              mobile: this.state.tel,
              code: this.state.code,
              number: this.serial_number,
            }).then((responseJson) => {
              showToast('绑定成功')
              this.props.navigation.navigate('CertificationStatus')
            })
          }}
        >
          <Text style={{ fontSize: px(16) }}>确认</Text>
        </Button>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    this.setState({
      name: LoginManager.userInfo.realname,
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
    backgroundColor: '#F3F3F3',
  },
  toptext: {
    marginHorizontal: px(20),
    height: px(132),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
  },
  text_one: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px(45),
    borderBottomWidth: px(1),
    borderColor: '#E9ECEF',
    paddingLeft: px(16),
    paddingRight: px(6),
  },
  textstyle: {
    fontSize: px(14),
    color: '#0F0F0F',
    flex: 1,
  },
  textstyle_right: {
    fontSize: px(14),
    alignContent: 'flex-end',
    color: '#ABABAB',
  },
  button: {
    width: px(300),
    height: px(44),
    backgroundColor: '#E7912D',
    borderRadius: px(22),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: px(43),
  },
})
