countries = [
  {
    id: 'zh_CN',
    language: '简体中文',
    countryCode: {
      rawValue: '0086',
      displayValue: '中国大陆 (+86)',
    },
    iconUrl: 'assets/images/flags/cn.png',
    sortOrder: 1,
  },
  {
    id: 'en_US',
    language: 'English(US)',
    countryCode: {
      rawValue: '0001',
      displayValue: 'U.S. (+1)',
    },
    iconUrl: 'assets/images/flags/us.png',
    sortOrder: 2,
  },
  {
    id: 'en_GB',
    language: 'English(GB)',
    countryCode: {
      rawValue: '0044',
      displayValue: 'U.K. (+44)',
    },
    iconUrl: 'assets/images/flags/gb.png',
    sortOrder: 3,
  },
  {
    id: 'ja_JP',
    language: '日本語',
    countryCode: {
      rawValue: '0081',
      displayValue: '日本 (+81)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 4,
  },
  {
    id: 'pl_PL',
    language: 'Polskie',
    countryCode: {
      rawValue: '0048',
      displayValue: 'Polska (+48)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 5,
  },
  {
    id: 'nl_NL',
    language: 'Nederlands',
    countryCode: {
      rawValue: '0031',
      displayValue: 'Nederland (+31)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 6,
  },
  {
    id: 'fr_FR',
    language: 'Français',
    countryCode: {
      rawValue: '0033',
      displayValue: 'France (+33)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 7,
  },
  {
    id: 'de_DE',
    language: 'Deutsche',
    countryCode: {
      rawValue: '0049',
      displayValue: 'Deutschland (+49)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 8,
  },
  {
    id: 'it_IT',
    language: 'italiano',
    countryCode: {
      rawValue: '0039',
      displayValue: 'Italia (+39)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 9,
  },
  {
    id: 'hu_HU',
    language: 'Magyar',
    countryCode: {
      rawValue: '0036',
      displayValue: 'Magyarország (+36)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 10,
  },
  {
    id: 'mc_MC',
    language: 'Français',
    countryCode: {
      rawValue: '0377',
      displayValue: 'Monaco (+377)',
    },
    iconUrl: 'assets/images/flags/jp.png',
    sortOrder: 11,
  },
]

// console.log(countries.map((item) => {
//   return "+" + item.countryCode.displayValue.split("+")[1].split(")")[0]
// }))

let targetList = [
  {
    free: 0.006976598,
    locked: -3.3881317890172014e-21,
    coin: 'BTC',
  },
  {
    free: 0.000019960000000000002,
    locked: 0,
    coin: 'ETH',
  },
  {
    free: 0.10982817745999979,
    locked: 0.07985129999999985,
    coin: 'USDT',
  },
]

console.log(
  targetList.filter((item) => {
    return item.coin.indexOf('T') >= 0
  }),
)

console.log('USDT'.indexOf(''))

let arr = ['str1', 'str2']

console.log(arr.indexOf('str22'))

let account = {
  logout: 'account/logout',
  profile: 'account/profile',
}

for (let [key, value] of Object.entries(account)) {
  console.log(value)
}
let sells = [1, 22, 33, 44, 55, 66, 77, 88]
console.log(sells.slice(0, 5))

// .reverse()
console.log(sells.reverse().slice(-5))

let flist = [22, 33, 44]
if (flist.indexOf(22) >= 0) {
  console.log('xxx')
} else {
  console.log('no')
}

// let buys = [
//   { _id: '5d35464f9d75aa227a5e07ce', price: 0.019259, amount: 0.2, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07cf', price: 0.019247, amount: 195.8, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d0', price: 0.019243, amount: 60, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d1', price: 0.019241, amount: 0.2, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d2', price: 0.01924, amount: 10.4, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d3', price: 0.019229, amount: 6.6, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d4', price: 0.019228, amount: 40, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d5', price: 0.019226, amount: 60, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d6', price: 0.019222, amount: 97.9, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d7', price: 0.019221, amount: 0.5, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d8', price: 0.019213, amount: 23.1, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07d9', price: 0.019196, amount: 32, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07da', price: 0.019195, amount: 49.4, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07db', price: 0.019191, amount: 180, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07dc', price: 0.01919, amount: 24, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07dd', price: 0.019171, amount: 0.4, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07de', price: 0.01917, amount: 24, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07df', price: 0.019167, amount: 87.7, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07e0', price: 0.019165, amount: 16.1, createdAt: 1563772494432 },
//   { _id: '5d35464f9d75aa227a5e07e1', price: 0.019164, amount: 0.3, createdAt: 1563772494432 },
//   { _id: '5cbfc55f38b6ae41d5c23e8f', price: 1e-7, amount: 1, createdAt: 1556071775124 },
// ]

let buys = [
  { _id: '5d35464f9d75aa227a5e07ce', price: 0.019259, amount: 0.2, createdAt: 1563772494432 },
  { _id: '5d35464f9d75aa227a5e07cf', price: 0.019247, amount: 195.8, createdAt: 1563772494432 },
  { _id: '5d35464f9d75aa227a5e07d0', price: 0.019243, amount: 60, createdAt: 1563772494432 },
  { _id: '5d35464f9d75aa227a5e07d1', price: 0.019, amount: 0.2, createdAt: 1563772494432 },
]

// 递归实现一个深拷贝
function deepClone(source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  var targetObj = source.constructor === Array ? [] : {}
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 截取小数（不入）
function tradeFloor(value, precision) {
  let result = Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
  return result
}

function addZerosToDecimal(f, zeroNum) {
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + zeroNum) {
    s += '0'
  }
  return s
}

function getListByDepth(targetDepth, originList, num, isBuy) {
  targetDepth = parseInt(targetDepth)
  console.log('targetDepth:' + targetDepth)
  if (targetDepth == -1) {
    return originList.slice(0, num)
  }
  let currentIndexItem = deepClone(originList[0])
  currentIndexItem.price = tradeFloor(currentIndexItem.price, targetDepth)
  let newBuys = [currentIndexItem]
  for (let index = 1; index < originList.length; index++) {
    const element = originList[index]
    let price = tradeFloor(element.price, targetDepth)
    if (price == currentIndexItem.price) {
      currentIndexItem.amount = currentIndexItem.amount + element.amount
      // console.log('element.price:' + element.price + '  tradeFloor():' + price)
    } else {
      currentIndexItem = deepClone(element)
      currentIndexItem.price = addZerosToDecimal(price, targetDepth)
      if (price <= 0) {
        currentIndexItem.price = -1
        currentIndexItem.amount = -1
      }
      newBuys.push(currentIndexItem)
    }
  }
  // console.log(newBuys)
  while (newBuys.length < num) {
    newBuys.push({ price: -1, amount: -1, type: isBuy ? 'buyer' : 'seller' })
  }
  return newBuys.slice(0, num)
}

console.log(getListByDepth(4, buys, 8, true))

console.log(addZerosToDecimal(2, 3))
console.log(addZerosToDecimal('2', 3))

console.log(typeof '--')
