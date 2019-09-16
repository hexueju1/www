// UNKNOWN = 9999,
//   REACH_API_LIMIT = 9998,
//   VERIFY_CODE_UNMATCHED = 9997,
//   INVALID_PARAMETERS = 9996,

//   // master data
//   INVALID_COIN_PAIR = 3000,
//   UNSUPPORT_COIN = 3001,

//   // account related
//   UNAUTHENTICATED = 4000,
//   DUPLICATE_REGISTRATION = 4001,
//   INVALID_USER_INFO = 4002,
//   INACTIVATED_USER = 4003,
//   GEETEST_FAILURE = 4004,
//   ACTIVATION_FAILURE = 4005,
//   TWO_STEP_FAILURE = 4006,

//   // Verification related
//   SEND_MAIL_VERIFY_CODE_FAILURE = 4100,
//   SEND_SMS_VERIFY_CODE_FAILURE = 4101,
//   DUPLICATE_VERIFICATION = 4102,
//   PHONE_NUM_INVALID = 4103,

//   // order related
//   MAKE_ORDER_FAILURE = 5000,
//   INSUFFICIENT_BALANCE_FOR_ORDER = 5001,
//   ILEGAL_ORDER_OPERATION = 5002,

//   // wallet related
//   UNFOUND_COIN = 6000,
//   INVALID_ADDRESS = 6001,
//   WITHDRAW_FALIURE = 6002,
//   INVALID_WITHDRAW_AMOUNT = 6003,

//   // API Key
//   INVALID_API_KEY = 7000,
//   INVALID_API_KEY_PERMISSION = 7001,

//   // Financing related
//   INSUFFICIENT_TRANSFER = 8000,
//   INSUFFICIENT_AVAILABLE_TO_PURCHASE = 8001,
//   PRODUCT_FILLED_UP = 8002,
//   INSUFFICIENT_INTEREST_TO_UNLOCK = 8003,
//   UNLOCK_LIMIT_UNSATISFIED = 8004,
//   PURCHASE_LIMIT_UNSATISFIED = 8005,
//   PRODUCT_UNFOUND = 8006

import { showToast } from './MyToastUtils'

// { errors: [ { code: 9999, msg: 'Unknown error :(' } ] }
// [missing "en.4102" translation]
export function showErrorToast(errorJson) {
  showToast(errorJson)
}