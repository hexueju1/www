export function getPercentStr(value) {
  let percentStr = value < 0 ? (value * 100).toFixed(2) + '%' : '+' + (value * 100).toFixed(2) + '%'
  return percentStr
}

export function formatNum(num) {
  return parseFloat(num / 10000) + '万'
}

export function formatNumEn(num) {
  return parseFloat(num / 1000000) + 'M'
}
