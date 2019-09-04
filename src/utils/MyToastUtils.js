import Toast from 'react-native-root-toast'
import RRCLoading from '../components/overlayer/RRCLoading'
import LoadingImage from '../images/common_loading.gif'
import { color, size, layout, style } from '../common/MyStyle'
import ToastIos from '../components/toast/toast'
import { Platform, ToastAndroid } from 'react-native'
import LocalConfigManager from '../common/LocalConfigManager'

let forceLoading = false

RRCLoading.setLoadingOptions({
  text: '',
  loadingBackgroundColor: color.transparent,
  loadingImage: LoadingImage,
  loadingViewStyle: { backgroundColor: color.transparent },
  loadingTextStyle: {},
  onPress: () => {
    if (!forceLoading) {
      hideLoading()
    }
  },
})

/**
 * 默认10秒后自动消失
 */
export function showLoading(hideAfterSeconds = 10, force = false) {
  if (LocalConfigManager.hideLoading) {
    return
  }
  forceLoading = force
  RRCLoading.show()
  this.timeout = setTimeout(() => {
    hideLoading()
  }, hideAfterSeconds * 1000)
  // 默认所有loading前n秒不允许取消
  if (!forceLoading) {
    forceLoading = true
    this.forceTimeout = setTimeout(() => {
      forceLoading = false
    }, 1000)
  }
}

export function hideLoading() {
  RRCLoading.hide()
  this.timeout && clearTimeout(this.timeout)
  this.forceTimeout && clearTimeout(this.forceTimeout)
}

export function showToast(msg) {
  console.log('showToast:' + msg)
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  })
  return toast
}

export function showToastNative(msg) {
  let toast

  if (Platform.OS === 'android') {
    toast = ToastAndroid
    toast.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  } else {
    toast = ToastIos
    toast.showToast(msg)
  }

  return toast
}
