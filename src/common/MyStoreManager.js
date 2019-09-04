
/**
 *
 * @format
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';
import MyJsonUtils from '../utils/MyJsonUtils'
import {LOG, LOG_Store} from '../utils/MyDebugUtils'

class MyStoreManager {


  constructor() {
    LOG_Store('MyStoreManager constructor');
  }

  // async/await 只是JS中Promise的语法糖而已。
  storeData = async (key, data) => {
    try {
      LOG_Store("storeData:")
      LOG_Store(data)
      await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      LOG_Store(e)
    }
  }

  getData = async (key) => {
    let result = null
    try {
      LOG_Store("getData key = " + key + " data:")
      result = await AsyncStorage.getItem(key)
      LOG_Store(result)
      LOG_Store(typeof result)
      if (result !== null) {
        if (typeof result == 'string') {
          result = MyJsonUtils.stringToJson(result)
        }
        LOG_Store("getData success" + result)
      } else {
        LOG_Store("getData null ")
      }
    } catch (e) {
      LOG_Store(e)
    }
    LOG_Store("finish getData")
    return result
  }

  delete = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      LOG_Store(e)
    }
  }

}

export default (new MyStoreManager);