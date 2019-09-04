import CameraRoll from '@react-native-community/cameraroll'
import { showToast } from '../utils/MyToastUtils'
import PermissionManager from '../common/PermissionManager'

var RNFS = require('react-native-fs')

export function saveQrToDisk(viewShot) {
  console.log('saveQrToDisk start')
  return new Promise(function(resolve, reject) {
    viewShot.capture().then((uri) => {
      console.log('viewShot.capture():', uri)
      resolve(uri)
      CameraRoll.saveToCameraRoll(uri, 'photo')
        .then((result) => {
          console.log('图片路径' + result)
          showToast('图片保存成功')
        })
        .catch((error) => {
          console.log(error)
          showToast('图片保存失败')
          PermissionManager.requestPermission()
          reject(error)
        })
    })
  })
}

// TODO 权限check
export function saveImageToDisk(viewShot) {
  console.log('saveImageToDisk start')
  return new Promise(function(resolve, reject) {
    viewShot
      .capture()
      .then((uri) => {
        console.log('viewShot.capture():', uri)
        let targetPath = RNFS.DocumentDirectoryPath + '/target.png'
        console.log('targetPath:' + targetPath)
        if (RNFS.exists(targetPath)) {
          console.log('RNFS.exists:')
          RNFS.unlink(targetPath)
          console.log('RNFS after unlink:')
        }
        RNFS.moveFile(uri, targetPath)
          .then((success) => {
            console.log('FILE WRITTEN!' + targetPath)
            resolve(targetPath)
          })
          .catch((error) => {
            console.log('RNFS.moveFile catch')
            console.log(error)
            reject(error)
          })
      })
      .catch((error) => {
        console.log('viewShot.capture() catch')
        reject(error)
      })
  })
}
