'use strict'

/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Platform, Text, View, Alert, TouchableOpacity, Linking } from 'react-native'
import BaseScreen from '../components/BaseScreen'
import { color, size, layout, style } from '../common/MyStyle'
import { LOG } from '../utils/MyDebugUtils'
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
import { showToast } from '../utils/MyToastUtils'
import _updateConfig from '../../update.json'
const { appKey } = _updateConfig[Platform.OS]

export default class UpdateScreen extends BaseScreen {
  static navigationOptions = {
    title: 'UpdateScreen',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <View style={styles.main_container}></View>
  }

  componentDidMount() {
    super.componentDidMount()
    console.log('isFirstTime')
    console.log(isFirstTime)
    console.log('isRolledBack')
    console.log(isRolledBack)

    if (isFirstTime) {
      Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
        {
          text: '是',
          onPress: () => {
            throw new Error('模拟启动失败,请重启应用')
          },
        },
        {
          text: '否',
          onPress: () => {
            markSuccess()
          },
        },
      ])
    } else if (isRolledBack) {
      Alert.alert('提示', '刚刚更新失败了,版本被回滚.')
    } else {
      console.log('update none')
    }
  }
  doUpdate = (info) => {
    downloadUpdate(info)
      .then((hash) => {
        Alert.alert('提示', '下载完毕,是否重启应用?', [
          {
            text: '是',
            onPress: () => {
              switchVersion(hash)
            },
          },
          { text: '否' },
          {
            text: '下次启动时',
            onPress: () => {
              switchVersionLater(hash)
            },
          },
        ])
      })
      .catch((err) => {
        Alert.alert('提示', '更新失败.')
      })
  }
  checkUpdate = () => {
    checkUpdate(appKey)
      .then((info) => {
        console.log(info)
        if (info.expired) {
          Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            {
              text: '确定',
              onPress: () => {
                info.downloadUrl && Linking.openURL(info.downloadUrl)
              },
            },
          ])
        } else if (info.upToDate) {
          Alert.alert('提示', '您的应用版本已是最新.')
        } else {
          Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
            {
              text: '是',
              onPress: () => {
                this.doUpdate(info)
              },
            },
            { text: '否' },
          ])
        }
      })
      .catch((err) => {
        Alert.alert('提示', '更新失败.')
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎使用热更新服务2019年06月19日10:59:14</Text>
        <Text style={styles.instructions}>
          当前包版本号: {packageVersion}
          {'\n'}
          当前版本Hash: {currentVersion || '(空)'}
          {'\n'}
        </Text>
        <TouchableOpacity onPress={this.checkUpdate}>
          <Text style={styles.instructions}>点击这里检查更新</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
