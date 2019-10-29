/**
 *
 * @format
 * @flow
 */

//  不使用{}来引用模块的情况下 import模块时的命名是随意的
import { DeviceEventEmitter } from 'react-native'
import MyHttpUtils from '../utils/MyHttpUtils'
import { LOG } from '../utils/MyDebugUtils'
import { showToast } from '../utils/MyToastUtils'
import MyStoreManager from '../common/MyStoreManager'
import { event, localStore, endpoint } from '../common/Constants'

class LoginManager {
  /**
{
    "status": "success",
    "code": 200,
    "data": {
        "id": 65538,
        "number": "0758136429",
        "admin_id": 120,
        "group_id": 1,
        "username": "18963985141",
        "mobile": "18963985141",
        "token": "ifimeGZXSrWBVkOnlpMpgbpEkaAEBdrX",
        "status": "normal",
        "realname": "严张锦",
        "address": "湖北省荆州市荆州区东堤街190号",
        "id_number": "421003199110081593",
        "id_authority": "",
        "id_timelimit": "",
        "verification": "",
        "face_validate": "0",
        "mobile_validate": "normal",
        "card_validate": "normal",
        "face_time": 1564495158,
        "collect_time": 0,
        "card_time": 1564496040,
        "bank_name": "招商银行",
        "card_number": "6214851211358317",
        "card_type": "借记卡",
        "card_name": "银联IC金卡",
        "lng": "120.663915",
        "lat": "0.00",
        "money": "0.00",
        "score": 0,
        "borrow_limit": "2099.99",
        "borrow_days": "6",
        "borrow_total": 8,
        "using_quota": 1600.01,
        "createtime": "2019-07-22 22:18:57"
    }
}
   */
  userInfo = undefined
  borrowInfo = undefined

  /**

  {
    "sms":[],
    "contacts":[],
    "apps":[],
    "deviceInfo":{}
  }
   */
  phoneData = {
    sms: [],
    contacts: [],
    apps: [],
    deviceInfo: {},
  }

  constructor() {
    LOG('LoginManager constructor')
    let that = this
    DeviceEventEmitter.addListener(event.needLogout, function(data) {
      console.log('addListener needLogout')
      that.logout()
    })
  }

  afterLogin = (responseJson, updateLocal = false) => {
    console.log('afterLogin')
    this.userInfo = responseJson
    MyHttpUtils.token = this.userInfo.token
    DeviceEventEmitter.emit(event.loginStatusChange)
    // 保存到本地
    if (updateLocal) {
      MyStoreManager.storeData(localStore.userInfo, this.userInfo)
    }
  }

  isLogin = () => {
    return this.userInfo ? true : false
  }

  logout = () => {
    console.log('do logout!')
    this.cleanLoginData()
  }

  cleanLoginData = () => {
    console.log('cleanLoginData')
    this.userInfo = undefined
    MyHttpUtils.token = undefined
    DeviceEventEmitter.emit(event.loginStatusChange)
    MyStoreManager.delete(localStore.userInfo).then(() => {})
  }

  checkCookieAndUpdateProfile = () => {
    LOG('LoginManager checkCookieAndUpdateProfile')
    MyStoreManager.getData(localStore.userInfo).then((userInfo) => {
      if (userInfo) {
        this.afterLogin(userInfo)
      }
    })
  }

  /**
   * 从服务器获取最新的个人信息
   */
  updateProfileByServer = () => {
    if (this.isLogin()) {
      console.log('updateProfileByServer......')
      MyHttpUtils.fetchRequest('post', endpoint.user.detail).then((responseJson) => {
        this.userInfo = responseJson.data
        MyHttpUtils.token = this.userInfo.token
        DeviceEventEmitter.emit(event.userProfileUpdate)
        MyStoreManager.storeData(localStore.userInfo, this.userInfo)
      })
    }
  }
  updateBorrow = () => {
    if (this.isLogin()) {
      console.log('updateBorrow......')
      MyHttpUtils.fetchRequest('post', endpoint.user.borrowList, { limit: 500 }).then((responseJson) => {
        this.borrowInfo = responseJson.data.data[0]
        console.log(this.borrowInfo)
        DeviceEventEmitter.emit(event.userProfileUpdate)
      })
    }
  }

  status_Text = (apply, borrow) => {
    switch (apply) {
      case '0':
        return '订单审核中'
      case '1':
        switch (borrow) {
          case '0':
            return '放款中'
          case '1':
            return '未到还款日'
          case '2':
            return '账单已还清'
          case '3':
            return '账单已逾期'
          case '4':
            return '续期中'
          case '5':
            return '已到还款日'
        }
      case '2':
        return '审核拒绝'
    }
  }
}

export default new LoginManager()
