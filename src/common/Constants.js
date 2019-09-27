/**
 * 存放所有图片资源
 */
export const images = {
  logo: require('../images/png/logo.png'),
  homeSelect: require('../images/tabbar/home-select.png'),
  homeUnSelect: require('../images/tabbar/home-unselect.png'),
  personal_pic: require('../images/png/personal_pic.png'),
  my_info: require('../images/png/my_info.png'),
  need_borrow: require('../images/png/need_borrow.png'),
  my_card: require('../images/png/my_card.png'),
  about_us: require('../images/png/about_us.png'),
  address_icon: require('../images/png/address_icon.png'),
  home_top_input_bg: require('../images/home/home_top_input_bg.png'),
  home_top_bg: require('../images/home/home_top_bg.png'),
  home_second: require('../images/home/home_second.png'),
  up_money: require('../images/png/up_money.png'),
  new_road: require('../images/png/new_road.png'),
  all: require('../images/png/all.png'),
  borrow_question: require('../images/png/borrow_question.png'),
  pay_question: require('../images/png/pay_question.png'),
  limit: require('../images/png/limit.png'),
  login_background: require('../images/login_background.png'),
  login_button: require('../images/login_button.png'),
  login_bottom: require('../images/login_bottom.png'),
  login_pic: require('../images/png/login_pic.png'),
  borrow_pic: require('../images/png/borrow_pic.png'),
  small_borrow: require('../images/png/small_borrow.png'),
  small_payoff: require('../images/png/small_payoff.png'),
  idcard_sample: require('../images/png/idcard_sample.png'),
  camera: require('../images/png/camera.png'),
  msglist_logo: require('../images/png/msglist_logo.png'),
  agreement_pic: require('../images/png/agreement_pic.png'),
  repay_main: require('../images/png/repay_main.png'),
  bank_logo: require('../images/png/bank_logo.png')
}
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
    checkApply: 'user/checkApply',
    mobilelogin: 'user/mobilelogin',
    get_msg_list: 'user/get_msg_list',
    messageDetails: 'user/messageDetails',
    checkAuthentication: 'user/checkAuthentication',
    bankinfo: 'user/bankinfo',
  },
  borrow: {
    // type 还款1 借款0 page
    get_list: 'borrow/get_list',
    // ordersn type
    detail: 'borrow/detail',
  },
  common: {
    get_kefu: 'common/get_kefu',
  },
}
