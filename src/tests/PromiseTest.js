/**
 * Promise和 async&await的理解
 * 
 */

// let promiseFunc = (ok) => {
//   return new Promise(function (resolve, reject) {
//     if (ok) {
//       resolve("hehe")
//     } else {
//       // 不管有几个resolve和reject，只会取第一个返回
//       resolve("second")
//       // 整个函数体执行完毕才会执行resolve或者reject
//       console.log("first")
//       reject("never")
//     }
//   })
// }

// promiseFunc(false).then((params) => {
//   console.log(params)
//   return params
//   // 下一个then接收上一个return数据
// }).then((params) => {
//   console.log(params)
// }).catch((error) => {
//   console.log("error")
//   console.log(error)
// })


// async/await可以简化异步操作的代码，用同步的形式表示异步的过程
// async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

// function normalFunc() {
//   return "normal"
// }

asyncCall = async () => {
  console.log('calling');
  // async函数实际上返回的是一个Promise对象
  try {
    var result = await resolveAfter2Seconds();
    // var x = 1/0
  } catch (error) {
    // throw error
    return 'hehe'
  }
  console.log(result)

  // return console.log('API1 request failed, message:')
  // return "return value"
}

asyncCall().then((value) => {
  if (value) {
    console.log("value = " + value)
    return
  }
  console.log("finall")
}).then((error) => {
  console.log(error)
})

