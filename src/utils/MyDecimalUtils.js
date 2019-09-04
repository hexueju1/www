
/**
 * 四舍五入保留num位小数
 * @param v
 * @param num 保留位数
 * @param isZeroFill 默认补0；false-不补
 * @returns {*}
 */
function toDecimal(v, num, isZeroFill) {
  var f = parseFloat(v);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(v * (Math.pow(10, num))) / Math.pow(10, num);
  var s = f.toString();
  if (isZeroFill !== false) {
    var rs = s.indexOf('.');
    if (num > 0 && rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + num) {
      s += '0';
    }
  }
  return s;
}


console.log(toDecimal("111.2345", 2, false))
console.log(toDecimal("113213213213211.2345", 2, false))