/**
 *
 * @format
 * @flow
 */

import { DeviceEventEmitter } from 'react-native'
import MyHttpUtils from '../utils/MyHttpUtils'
import { LOG } from '../utils/MyDebugUtils'
import NetInfo from '@react-native-community/netinfo'
import { showToast } from '../utils/MyToastUtils'
class NetworkManager {
  unsubscribe = undefined
  lastState = undefined

  constructor() {
    LOG('NetworkManager constructor')
  }

  init = () => {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      if (this.lastState && !state.isConnected) {
        showToast('网络连接异常')
      }
      console.log('state.type' + state.type)
      this.lastState = state
    })
  }

  getInfo = () => {
    if (this.lastState) {
      // this.lastState.type
      return '当前网络连接状态：' + (this.lastState.isConnected ? '正常' : '错误') + ',' + (this.lastState.isInternetReachable ? '正常' : '错误')
    } else {
      return ''
    }
  }
}

export default new NetworkManager()
