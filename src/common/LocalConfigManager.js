/**
 *
 * @format
 * @flow
 */

import { LOG } from '../utils/MyDebugUtils'
import localConfig from '../../local.json'

class LocalConfigManager {
  usePassword = localConfig.usePassword
  token = localConfig.token
  debugScreen = localConfig.debugScreen
  config = localConfig
  constructor() {
    LOG('LocalConfigManager usePassword:' + this.usePassword)
  }
}

export default new LocalConfigManager()
