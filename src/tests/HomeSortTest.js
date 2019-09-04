/**
 * 
 * 
使用var声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象；
使用let声明的变量，其作用域为该语句所在的代码块内，不存在变量提升；
使用const声明的是常量，在后面出现的代码中不能再修改该常量的值。
 * 
 */
let targetArr = [
  {
    "pair": "XRP-BTC",
    "updatedAt": 1558073521706,
    "close": 0.00005262,
    "high": 0.00005613,
    "low": 0.00005032,
    "change": -0.05137912385073015,
    "volume": 45293.733002838206,
    "volumeDiff": 15
  },
  {
    "pair": "LTC-BTC",
    "updatedAt": 1558073778330,
    "close": 0.012162,
    "high": 0.012621,
    "low": 0.011531,
    "change": -0.023994863975603936,
    "volume": 869.2574549999885,
    "volumeDiff": 0.26
  }, {
    "pair": "ETH-USDT",
    "updatedAt": 1558073812498,
    "close": 242.55,
    "high": 278.97,
    "low": 236.09,
    "change": -0.06926323867996934,
    "volume": 1464.7548918431248,
    "volumeDiff": 0.00335
  }, {
    "pair": "ETH-BTC",
    "updatedAt": 1558073805751,
    "close": 0.033365,
    "high": 0.034811,
    "low": 0.03129,
    "change": 0.02601556013407545,
    "volume": 902.0333099999472,
    "volumeDiff": 0.094
  },
  {
    "pair": "XRP-ETH",
    "updatedAt": 1558073731725,
    "close": 0.00158762,
    "high": 0.00172389,
    "low": 0.00156148,
    "change": -0.06945038713799224,
    "volume": 219525,
    "volumeDiff": 4
  },
  {
    "pair": "BTC-USDT",
    "updatedAt": 1558073799086,
    "close": 7265.87,
    "high": 8125.98,
    "low": 7160.03,
    "change": -0.09289672745341122,
    "volume": 218.94844292267874,
    "volumeDiff": 0.009597
  },
  {
    "pair": "LTC-ETH",
    "updatedAt": 1558073758923,
    "close": 0.36461,
    "high": 0.38665,
    "low": 0.35713,
    "change": -0.04878557825258928,
    "volume": 120.70200000000013,
    "volumeDiff": 0.003
  },
  {
    "pair": "XRP-USDT",
    "updatedAt": 1558073582234,
    "close": 0.3832,
    "high": 0.4546,
    "low": 0.3775,
    "change": -0.13713127673947312,
    "volume": 865429.6111387424,
    "volumeDiff": 118.6
  },
  {
    "pair": "LTC-USDT",
    "updatedAt": 1558073798261,
    "close": 88.37,
    "high": 102.02,
    "low": 87.53,
    "change": -0.11514969460298387,
    "volume": 13131.768640000093,
    "volumeDiff": 0.10544
  },
]


function sortNumber(a, b) {
  return a.close - b.close
}

targetArr = targetArr.sort(sortNumber)
console.log(targetArr)

pair = "XRP-BTC"
console.log(pair.split('-'))

// 获取当前时间戳
console.log(new Date().getTime())

let endpoint = "account/login_ga"
console.log(endpoint.startsWith('account/login'))

data = {hehe:"woqu"}
data = "woqu"
console.log(JSON.stringify(data))

let num = 123
console.log(num.toString())