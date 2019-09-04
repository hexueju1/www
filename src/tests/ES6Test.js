const myArray = ['test1', 'test2', 'test1']
/**
 * 

 这是最简洁、最直接的遍历数组元素的语法
这个方法避开了 for-in 循环的所有缺陷
与 forEach() 不同的是，它可以正确响应 break、continue 和 return 语句
for-in 循环用来遍历对象属性。

for-of 循环用来遍历数据—例如数组中的值。

 */
for (const value of myArray) {
  console.log(value)
}
for (const index in myArray) {
  console.log(index)
}

console.log('uniqSet:')
const uniqSet = new Set(myArray)
for (const value of uniqSet) {
  console.log(value)
}

const myMap = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
}
console.log('myMap:')
for (const [key, value] of Object.entries(myMap)) {
  console.log('key:' + key + ' value:' + value)
}
console.log(Object.entries(myMap))
console.log(Object.values(myMap))

function test() {
  return 'hehe'
}
