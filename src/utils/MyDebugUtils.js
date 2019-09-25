/**
 * 识别开发环境是否是debug开发环境
 */
import { NativeModules } from 'react-native'

const SHOW_LOG = true

export function isDebug() {
  const { scriptURL } = NativeModules.SourceCode
  const devEvn = scriptURL.split('&')[1]
  return devEvn === 'dev=true'
}

export function LOG(msg) {
  if (SHOW_LOG) {
    console.log(msg)
  }
}

export function LOG_Store(msg) {
  if (true) {
    console.log(msg)
  }
}
