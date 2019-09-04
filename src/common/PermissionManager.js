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

  requestPermission = async () => {
    try {
      if (Platform.OS == 'ios') {
        return true
      }
      // new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE},
      //
      //返回string类型
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        //第一次请求拒绝后提示用户你为什么要这个权限
        title: '请求磁盘空间',
        message: '该操作需磁盘权限才能进行',
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
}

export default new PermissionManager()
