import { Dimensions, PixelRatio, StatusBar, Platform } from 'react-native'

export const deviceWidth = Dimensions.get('window').width //设备的宽度
export const deviceHeight = Dimensions.get('window').height //设备的高度
export const statusHeight = StatusBar.currentHeight // 状态栏的高度，如果要自定义头部的话会用到

export function px(size) {
  return (deviceWidth / 375) * size
}

export function sp(fontSize) {
  return Platform.OS === 'android' ? fontSize / PixelRatio.getFontScale() : fontSize
}
