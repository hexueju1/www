import { Dimensions, PixelRatio, StatusBar, Platform, NativeModules } from 'react-native'
const { StatusBarManager } = NativeModules

export const deviceWidth = Dimensions.get('window').width //设备的宽度
export const deviceHeight = Dimensions.get('window').height //设备的高度
export const statusHeight = StatusBar.currentHeight // 状态栏的高度，如果要自定义头部的话会用到

// iPhoneX
const X_WIDTH = 375
const X_HEIGHT = 812

// screen
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

if (Platform.OS === 'ios') {
  StatusBarManager.getHeight((statusBarHeight) => {
    console.log('getHeight:\n\n\n')
    console.log(statusBarHeight)
  })
}

export function getStatusBarHeight() {
  let currentHeight = 0
  if (Platform.OS === 'android') {
    currentHeight = StatusBar.currentHeight
  } else {
    if (isIphoneX()) {
      currentHeight = 44
    } else {
      currentHeight = 20
    }
  }
  console.log('currentHeight = ' + currentHeight)
  return currentHeight
}

export function isIphoneX() {
  return (
    Platform.OS === 'ios' && ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) || (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
  )
}

export function px(size) {
  return (deviceWidth / 375) * size
}

export function sp(fontSize) {
  return Platform.OS === 'android' ? fontSize / PixelRatio.getFontScale() : fontSize
}
