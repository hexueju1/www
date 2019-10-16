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
  userInfo = undefined

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
    DeviceEventEmitter.emit(event.loginStatusChange_borrow)
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
    DeviceEventEmitter.emit(event.loginStatusChange_borrow)
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
}

export default new LoginManager()
