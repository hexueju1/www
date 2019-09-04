/**
 *
 * @format
 * @flow
 */

import { Platform, Alert, Linking } from 'react-native'
import { LOG } from '../utils/MyDebugUtils'
import { showToast } from '../utils/MyToastUtils'
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update'
import _updateConfig from '../../update.json'
import download from '../components/donwload/download'

const { appKey } = _updateConfig[Platform.OS]

class UpdateManager {
  versionName = packageVersion
  versionCode = 10307
  lastHash = undefined

  constructor() {
    LOG('UpdateManager constructor')
  }

  restart = () => {
    if (this.lastHash) {
      switchVersion(this.lastHash)
    }
  }

  showRestartAlert = (hash) => {
    Alert.alert('UPDATE_TIPS', 'UPDATE_TITLE', [
      {
        text: 'YES',
        onPress: () => {
          switchVersion(hash)
        },
      },
      {
        text: 'NO',
        onPress: () => {
          this.lastHash = hash
        },
      },
    ])
  }

  doUpdate = (info, auto = false) => {
    downloadUpdate(info)
      .then((hash) => {
        if (auto) {
          LOG('downloadUpdate auto')
          // 进入App后自动检查&下载更新
          try {
            const metaInfoObj = JSON.parse(info.metaInfo)
            console.log(metaInfoObj)
            if (metaInfoObj.force) {
              // 根据force字段决定是否提示用户重启
              this.showRestartAlert(hash)
            } else {
              this.lastHash = hash
            }
          } catch (error) {
            this.lastHash = hash
          }
        } else {
          this.showRestartAlert(hash)
        }
      })
      .catch((err) => {
        if (!auto) {
          showToast('UPDATE_FAIL')
        }
      })
  }

  checkUpdate = (auto = false) => {
    console.log('isFirstTime')
    console.log(isFirstTime)
    console.log('isRolledBack')
    console.log(isRolledBack)
    if (isFirstTime) {
      markSuccess()
    }
    checkUpdate(appKey)
      .then((info) => {
        console.log(info)
        if (info.expired) {
          // if (auto) {
          //   console.log('您的应用版本已更新,请前往应用商店下载新的版本',
          // } else {
          Alert.alert('UPDATE_TIPS', 'UPDATE_DOWNLOAD', [
            {
              text: 'SURE',
              onPress: () => {
                // info.downloadUrl && Linking.openURL(info.downloadUrl)
                // download.downloading('https://app.glenbit.com/app/GlenBit_v1.3.1.apk','GlenBit.apk',
                if (Platform.OS === 'android') {
                  if (info.downloadUrl) {
                    let index = info.downloadUrl.indexOf('GlenBit')
                    let version = info.downloadUrl.slice(index, info.downloadUrl.length)
                    download.downloading(info.downloadUrl, version)
                    showToast('DOWNLOAD_TIPS')
                  }
                } else {
                  info.downloadUrl && Linking.openURL(info.downloadUrl)
                }
              },
            },
          ])
          // }
        } else if (info.upToDate) {
          if (!auto) {
            showToast('UPDATE_ALREADY_UPDATED')
          }
        } else {
          if (auto) {
            this.doUpdate(info, auto)
          } else {
            Alert.alert('UPDATE_TIPS', 'UPDATE_CHECK_HAS_NEW', +info.name + 'UPDATE_OR_NOT', +info.description, [
              {
                text: 'YES',
                onPress: () => {
                  this.doUpdate(info)
                },
              },
              { text: 'NO' },
            ])
          }
        }
      })
      .catch((err) => {
        if (!auto) {
          showToast('UPDATE_FAIL')
        }
      })
  }
}

export default new UpdateManager()
