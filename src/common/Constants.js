import { styleType } from './MyStyle'

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
  bank_logo: require('../images/png/bank_logo.png'),
  about_icon: require('../images/png/about_icon.png'),
  about_us_one: require('../images/png/about_us_one.png'),
  about_us_two: require('../images/png/about_us_two.png'),
  refuse: require('../images/png/refuse.png'),
  successed: require('../images/png/successed.png'),
  passed: require('../images/png/passed.png'),
  using: require('../images/png/using.png'),
  allow: require('../images/png/allow.png'),
  unallow: require('../images/png/unallow.png'),
  bank_camera: require('../images/png/bank_camera.png'),
  certification_suc: require('../images/png/certification_suc.png'),
  certification_fail: require('../images/png/certification_fail.png'),
  sucess: require('../images/png/success.png'),
  acceptance: require('../images/png/Acceptance.png'),
  header_back: require('../images/png/back.png'),
  overtime_pic: require('../images/png/overtime_pic.png'),
  refuse_pic: require('../images/png/refuse_pic.png'),
  using_pic: require('../images/png/using_pic.png'),
  came: require('../images/png/came.png'),
  change: require('../images/png/change.png'),
}

if (styleType == 1) {
  images.header_back = require('../images1/png/back.png')
  images.login_button = require('../images1/png/login_pic.png')
}

/**
 * 定义  DeviceEventEmitter  事件名
 */
export const event = {
  // 登录状态发生变化
  loginStatusChange: 'loginStatusChange',
  // 用户信息刷新
  userProfileUpdate: 'userProfileUpdate',
  needLogout: 'needLogout',
  PayInfo: 'PayInfo',
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
  bank: {
    send_sms: 'risk/bank_send_sms',
    bind: 'risk/binding_bankcard',
  },
  user: {
    login: 'user/login',
    detail: 'user/detail',
    checkAuthentication: 'user/auth_status',
    bankinfo: 'user/bankinfo',
    borrowList: 'user/borrow/list',
    borrowDetail: 'user/borrow/detail',
    billMonth: 'user/bill/month',
    billYear: 'user/bill/year',
    userinfo: 'user/userinfo',
  },
  message: {
    list: 'message/list',
    check: 'message/check',
    detail: 'message/detail',
  },
  borrow: {
    before_borrow: 'borrow/detail',
    productInfo: 'borrow/product',
    borrow: 'borrow/apply',
  },
  common: {
    get_kefu: 'common/get_kefu',
    get_location: 'common/get_location',
    oss_signature: 'common/oss_signature',
  },
  liveness: {
    check_identity: 'liveness/check_identity',
  },
  collect: {
    collectgethc: 'collect/gethc',
  },
  risk: {
    check_bankcard: 'risk/check_bankcard',
    check_id_face: 'risk/check_id_face',
  },
  payment: {
    check: 'payment/check',
    create: 'payment/create',
  },
}
