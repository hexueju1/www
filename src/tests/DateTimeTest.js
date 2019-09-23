function timeToStr(date) {
  var date = new Date(parseInt(date))
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

let target = '1559123881307'
console.log(timeToStr(parseInt(target)))

function fun(p1, p2 = false) {
  console.log(p1)
  console.log(p2)
}

fun(123)

console.log('?t=' + new Date().getTime())

var date = '2019-9-26'
var newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
var nextDate = new Date()
nextDate.setDate(new Date(newDate).getDate() + 1)
console.log(nextDate)
console.log(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate())
