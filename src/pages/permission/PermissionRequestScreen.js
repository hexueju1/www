'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  requireNativeComponent,
  Platform,
  Dimensions,
  ToastAndroid,
  BackHandler,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import { Tab, Tabs, Container, Header, Content, Button, Text, Form, Item, Input, Label, Picker, Icon } from 'native-base'
import BaseScreen from '../../components/BaseScreen'
import { px, sp } from '../../utils/Device'
import { endpoint, images } from '../../common/Constants'
import MyHttpUtils from '../../utils/MyHttpUtils'
import { color } from '../../common/MyStyle'
import { showToast } from '../../utils/MyToastUtils'
import TabHeader from '../../common/TabHeader'
import Permissions from 'react-native-permissions'
import Contacts from 'react-native-contacts'

export default class MyMsgScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  toNextStep = () => {
    MyHttpUtils.fetchRequest('post', endpoint.user.checkAuthentication).then((responseJson) => {
      let url = ''
      // 0 需进行人证核验 1 需进行运营商认证 2 无需认证  3 bank
      if (responseJson.data.state == 0) {
        url = 'IDCard'
      } else if (responseJson.data.state == 1) {
        url = 'OperatorVerify'
      } else if (responseJson.data.state == 2) {
        url = 'BorrowConfirm'
      } else if (responseJson.data.state == 3) {
        url = 'BindBank'
      }
      if (url != '') {
        this.props.navigation.navigate(url)
        // this.props.navigation.replace(url)
      } else {
        showToast('非法状态')
      }
    })
  }

  agree = () => {
    // 请求权限并收集数据
    console.log(Platform.OS)
    // https://github.com/react-native-community/react-native-permissions
    Permissions.request('contacts').then((response) => {
      console.log(response)

      Contacts.getAll((err, contacts) => {
        if (err) {
          console.log(err)
        }
        console.log(contacts)
        // contacts returned
      })
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response == 'authorized') {
        if (Platform.OS == 'android') {
          Permissions.request(['readSms']).then((response) => {
            console.log(response)
            if (response == 'authorized') {
              this.toNextStep()
            }
          })
        } else {
          this.toNextStep()
        }
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <ScrollView>
          <TabHeader text="借款服务协议" />
          <View>
            {/* 借款协议头部 */}
            <View style={styles.topcontent}>
              <Image style={{ width: 54, height: 54, marginRight: 11 }} source={images.agreement_pic} />
              <Text style={{ color: '#111111', fontSize: 12, width: 270 }}>
                请您仔细阅读下列注意事项，并严格按照说明进行操作，如未按照要求进行操作，将会影响你的借款成功率。
              </Text>
            </View>

            {/* 借款协议中部内容 */}
            <View style={styles.content}>
              <Text style={{ fontSize: 12, color: '#111111', lineHeight: 20 }}>
                1.请在接下来的操作中的权限申请全部给予允许，若无法通过，请重试或卸载软件后重新安装。{'\n'}
                {'\n'}
                2.我们将会对您的身份信息进行严格验证，请您准备如下材料：{'\n'}
                {'\n'}
                <Text style={{ fontSize: 12, color: '#E91818' }}>
                  （a） 您本人有效的大陆居民身份证证件。{'\n'}
                  {'\n'}
                  （b） 您本人储蓄银行卡一张及对应绑定的手机号。{'\n'}
                  {'\n'}
                  （c） 能够正常接受收短信的本人身份证办理的手机号。{'\n'}
                  {'\n'}
                </Text>
                3.在申请认证中，会对您的信息进行验证，确保是您本人操作，本人有效身份证，本人有效银行卡，本人身份证注册的手机号。{'\n'}
                {'\n'}
              </Text>
            </View>
            <Button
              full
              style={styles.buttonstyle}
              onPress={() => {
                this.agree()
              }}
            >
              <Text style={{ color: color.white }}>同意</Text>
            </Button>
          </View>
          <Button
            full
            style={styles.buttonstyle}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Text style={{ color: color.white }}>拒绝</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
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
    paddingTop: 23,
    paddingBottom: 23,
  },
  content: {
    marginHorizontal: 20,
    height: 352,
    backgroundColor: '#FDFDFD',
    borderRadius: 8,
    borderTopWidth: 2,
    borderColor: '#F58C00',
    padding: 21,
    marginBottom: 23,
  },
  buttonstyle: {
    width: 130,
    height: 38,
    backgroundColor: '#F58C00',
    borderRadius: 19,
    marginBottom: 22,
    alignSelf: 'center',
  },
})
