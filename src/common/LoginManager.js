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
  }

  afterLogin = (responseJson, updateLocal = false) => {
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
    this.cleanLoginData()
  }

  cleanLoginData = () => {
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
}

export default new LoginManager()
