/**
 * 定义  DeviceEventEmitter  事件名
 */
export const event = {
  // 登录状态发生变化
  loginStatusChange: 'loginStatusChange',
}

/**
 * 本地数据存储对应的key
 */
export const localStore = {
  userInfo: 'userInfo',
}

/**
 * 接口的endpoint
 */
export const endpoint = {
  sms: {
    // 发送登录手机验证码
    send: 'sms/send',
  },
  user: {
    mobilelogin: 'user/mobilelogin',
  },
  borrow: {
    // type 还款1 借款0 page
    get_list: 'borrow/get_list',
    // ordersn type
    detail: 'borrow/detail',
  },
  coins: 'coins',
}
