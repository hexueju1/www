// let cookie = '__cfduid=d745d331cb93bbfaf8e9db1a9f177e9ea1559228645; expires=Fri, 29-May-20 15:04:05 GMT; path=/; domain=.glenbit.com; HttpOnly, connect.sid=s%3AUHP67Oz-hRBVorJA-V0KV9rv-fRADPhL.kcqZSpo2uD6IE2nsr8l5GNLAZwXtyaTrHvSorjZgDVc; Path=/; HttpOnly'
let cookie =
  'set-cookie:__cfduid=dc453bbfd4700c82fa48c7f8601a17f6b1559229312; expires=Fri, 29-May-20 15:15:12 GMT; path=/; domain=.glenbit.com; HttpOnly'

if (cookie.indexOf('connect.sid') >= 0) {
  console.log('connect.sid' + cookie.split('connect.sid')[1].split(';')[0])
}

let phone = '008618963985141'
console.log(phone.substr(0, 4))
console.log(phone.substr(4))

let errorMsg = '[missing "en.4102" translation]'

let target = 'HEHE woqu'
console.log(target.toLowerCase())

let token = '"123213ngisf"'
console.log(token.replace(/"/g, ''))

let showLoadingEndpoint = ['22', '33', '44']
showLoadingEndpoint.splice(showLoadingEndpoint.indexOf('33'), 1)
console.log(showLoadingEndpoint)

for (const char of 'heheda') {
  console.log(char)
}

console.log(String.fromCodePoint(0x20bb7))

console.log('abc'.repeat(3))

let targetPair = 'BTC-USDT'
console.log(targetPair.replace('-', '/'))

console.log('hehe'.indexOf('f'))

console.log('./assets/index.html?t=12321321'.split('?')[0])
console.log('./assets/index2.html'.split('?')[0])

console.log('index2'.endsWith('2'))

url = 'http://localhost:1024/sd/ '
if (/\?A(\d{6})/.test(url)) {
  console.log('hehe')
} else {
  console.log('hehe2')
}

target = '2019-08-13 20:49:22'
var curTime = new Date(target)
console.log(curTime.format('yyyy-MM-dd'))
