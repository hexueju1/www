import { Platform, DeviceEventEmitter } from 'react-native'
import { showToast, showLoading, hideLoading } from './MyToastUtils'
import { isDebug } from './MyDebugUtils'
import MyStoreManager from '../common/MyStoreManager'
import { event, localStore, endpoint } from '../common/Constants'
import { showErrorToast } from '../utils/HttpErrorCodeUtils'
import LocalConfigManager from '../common/LocalConfigManager'

const BaseUrl = 'https://thinko.cc/api/'
const LogStatus = true

/**
 * 存放需要显示loading的请求
 * 列表之类展示的数据一般不需要显示loading
 */
// let showLoadingEndpoint = [endpoint.order.make, endpoint.order.cancel]
// // account全部需要
// for (let [key, value] of Object.entries(endpoint.account)) {
//   if (value != endpoint.account.profile) {
//     showLoadingEndpoint.push(value)
//   }
// }

// 网络请求封装类
class MyHttpUtils {
  token = LocalConfigManager.token

  static log(msg) {
    if (LogStatus) {
      console.log(msg)
    }
  }

  static checkNeedShowLoading(targetEndpoint) {
    // if (showLoadingEndpoint.indexOf(targetEndpoint) >= 0) {
    //   showLoading()
    // }
  }
  // this.$store.commit('setClient','456201');//测试账户
  // this.$store.commit('setClient','123456');//闪贷
  // this.$store.commit('setClient','813275');//满意
  // this.$store.commit('setClient','564872');//九景
  // this.$store.commit('setClient','059612');//一日贷
  // this.$store.commit('setClient','184273');//信用花
  // this.$store.commit('setClient','703914');//玫瑰花
  // this.$store.commit('setClient','290135');//满天星
  fetchRequest(method, endpoint, params) {
    let url = BaseUrl + endpoint
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      platform: Platform.OS,
      client: '290135',
      token: this.token,
    }
    MyHttpUtils.log('header:' + JSON.stringify(header))
    let body = ''
    if (method == 'post') {
      var formBody = []
      for (var property in params) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(params[property])
        formBody.push(encodedKey + '=' + encodedValue)
      }
      body = formBody.join('&')
      MyHttpUtils.log('body:' + body)
      // let formData = new FormData();
      // for (let [key, value] of Object.entries(params)) {
      //   MyHttpUtils.log("key:" + key)
      //   MyHttpUtils.log("value:" + value)
      //   formData.append(key, value);
      // }
      // // body = JSON.stringify(params)
      // body = formData
      // MyHttpUtils.log("body:" + JSON.stringify(params))
    } else {
      let queryString = '?'
      let count = 0
      for (let [key, value] of Object.entries(params)) {
        if (count > 0) {
          queryString = queryString + '&'
        }
        queryString = queryString + key + '=' + value
        count = count + 1
      }
      MyHttpUtils.log(queryString)
      url = url + queryString
    }
    MyHttpUtils.log('method:' + method)
    MyHttpUtils.log('url:' + url)
    MyHttpUtils.checkNeedShowLoading(endpoint)
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: method,
        headers: header,
        body: body,
      })
        .then((response) => {
          MyHttpUtils.log('response.status = ' + response.status)
          if (response.ok) {
            return response.json()
          } else {
            MyHttpUtils.log('request error: ')
            MyHttpUtils.log(response)
            if (response.status == 401) {
              showErrorToast('请登录')
              DeviceEventEmitter.emit(event.needLogout)
              reject()
              return
            }
            showToast(response.status)
          }
        })
        .then((responseJson) => {
          if (responseJson) {
            MyHttpUtils.log('success fetch data')
            MyHttpUtils.log(responseJson)
            // 服务器返回错误信息
            // { code: 0, msg: '发送频繁，请稍后再试！', time: '1564134222', data: null }
            if (responseJson.code == 0) {
              showErrorToast(responseJson.msg)
              reject(responseJson)
              return
            }
            resolve(responseJson)
          }
        })
        .catch((error) => {
          if (isDebug()) {
            // showToast(error)
            console.log('request error: ' + error)
          }
          showToast('与服务器通讯失败... 请稍后重试')
          reject(error)
        })
        .finally(() => {
          MyHttpUtils.log('finally:' + endpoint)
          hideLoading()
        })
    })
  }
}

export default new MyHttpUtils()
