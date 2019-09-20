/**
 * 定义  DeviceEventEmitter  事件名
 */
export const event = {
  // 登录状态发生变化
  loginStatusChange: 'loginStatusChange',
  needLogout: 'needLogout',
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
  index: {
    /**
     * {
        "banner": [],
        "recommend": [],
        "unread_message": 2,
        "max_money": "10,000"
    }
     * 
     */
    index: 'index',
  },
  sms: {
    // 发送登录手机验证码
    send: 'sms/send',
  },
  user: {
    mobilelogin: 'user/mobilelogin',
    get_msg_list: 'user/get_msg_list',
    checkAuthentication: 'user/checkAuthentication',
  },
  borrow: {
    // type 还款1 借款0 page
    get_list: 'borrow/get_list',
    // ordersn type
    detail: 'borrow/detail',
  },
}
