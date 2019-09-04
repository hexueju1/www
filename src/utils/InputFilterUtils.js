export function filterNumberInput(text) {
  let newText = text.replace(/[^\d.]+/, '')
  newText = newText.replace(/^\./g, '') //验证第一个字符是数字（即第一个字符非“.”）
  newText = newText.replace(/\.{2,}/g, '.') //只保留第一个, 清除多余的
  newText = newText
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  return newText
}

export function filterNumberInputWithPricePrecision(text, precision = 2) {
  let newText = filterNumberInput(text)
  var reg = new RegExp('^(-)*(\\d+)\\.(\\d{' + precision + '}).*$')
  newText = newText.replace(reg, '$1$2.$3')
  return newText
}

export function filterNumberInputWithMinVolume(text, minVolume = 0.01) {
  if (minVolume >= 1) {
    minVolume = 0
  } else {
    minVolume = minVolume.toString().split('.')[1].length
  }
  return filterNumberInputWithPricePrecision(text, minVolume)
}
