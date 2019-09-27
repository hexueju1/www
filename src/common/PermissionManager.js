/**
 *
 * @format
 * @flow
 */

import { LOG, isDebug } from '../utils/MyDebugUtils'
import { Platform, PermissionsAndroid } from 'react-native'
import { showToast } from '../utils/MyToastUtils'
// Platform.OS == 'android'

class PermissionManager {
  constructor() {
    LOG('PermissionManager constructor')
  }

  requestCallLogPermission = async () => {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG, {
        //第一次请求拒绝后提示用户你为什么要这个权限
        title: '申请权限',
        message: '请在接下来的提示中点击允许，否则将无法进行下一步操作',
        buttonPositive: '好的',
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted success')
        return true
      } else {
        showToast('权限获取失败')
        return false
      }
    } catch (err) {
      showToast('权限获取失败')
      return false
    }
  }

  // const userResponse = await PermissionsAndroid.requestMultiple([
  //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //   PermissionsAndroid.PERMISSIONS.CALL_PHONE
  // ]);
}

export default new PermissionManager()
