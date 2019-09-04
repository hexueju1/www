function showTestLoading(va1 = 11, var2 = 22) {
  console.log(va1)
  console.log(var2)
}

showTestLoading(undefined, 222)
let result = []
for (let index = 1; index <= 4; index++) {
  result.push(index)
}
console.log(result.length)

let num = 12.34567
console.log(num.toString().split('.')[1].length)

console.log(parseInt('1 Decimal'))

console.log(JSON.stringify({ key: 'value', hehe: 'woqu' }, null, '\t'))
