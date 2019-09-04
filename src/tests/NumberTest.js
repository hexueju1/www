var num = 22.127456
// 银行家舍入规则：四舍六入五取偶
console.log(num.toFixed(5))

//保留n位小数
function roundFun(value, n) {
  return Math.floor(value * Math.pow(10, n)) / Math.pow(10, n)
}

console.log(roundFun(num, 5))
console.log(roundFun(1, 5))
console.log(roundFun(1.1, 5))
console.log(roundFun(1.9, 5))
console.log(roundFun(0.1234, 5))

let strNum = '8006'
console.log(parseInt(strNum))

let intNum = 8006
console.log(typeof intNum.toString())

let a = 123.234
let b = '123.2341'

console.log(a > b)
console.log(a < b)
console.log(a == b)
console.log(a === b)

console.log(0.00698657 * 7743.21 + 0.00001996 * 244.2 + 0.1098)

console.log('0' < 0)

console.log(isNaN('123.23'))
console.log('25%' * 12)

let minVolume = 0.001
console.log(minVolume.toString().length)
// 截取小数（不入）
floorFunc = (value, precision) => {
  // console.log('value:' + value)
  // console.log("precision:" + precision)
  return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
}

function toNonExponential(num) {
  num = parseFloat(num)
  if (!num) {
    return 0
  }
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

console.log(toNonExponential('') + '')
console.log(toNonExponential('3.7e-9'))
console.log(toNonExponential('3.7'))
console.log(toNonExponential('1232133.7432432424'))
console.log(toNonExponential('0'))
console.log(toNonExponential('0.123'))
console.log(toNonExponential('+0.123'))
console.log(toNonExponential('-0.123'))
console.log(toNonExponential())
console.log(toNonExponential('english123'))
console.log(toNonExponential('1.2.3'))

volume = 596.3880549999999
console.log(volume.toFixed(8))
price = 130.67
console.log(parseFloat(price.toFixed(8)))

price = 130.19999999
console.log(price.toFixed(8))

console.log('Failure'.indexOf('Failure'))
// console.log(parse('11.2345'))

console.log('11' / '22')
console.log('' / '')
console.log('' / '' <= 0)
if ('' / '') {
  console.log('ok')
}
console.log(parseInt(360, 10))

console.log('1D' < 6110)

console.log(parseInt(104 / 16.33333396911621))
console.log(parseInt(6.5))
console.log(parseInt(6.7))

console.log(parseFloat('22') < parseFloat('111'))
