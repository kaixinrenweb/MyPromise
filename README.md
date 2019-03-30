## MyPromise
- 自己封装的一个`promise`
- 旨在关注`promise`的内部原理
- 虽然在开发的过程中不会使用自己封装的`promise`，但是自己去封装，就会对`promise`的内容运行的原理比较的了解，这样有助于在开发的过程中遇到问题，也能很快的定位问题，从而解决问题

## Process
- 一部分一部分的完善
- v1...表示每个版本的完善

## Test
- 测试文件
- 每个版本的测试，一一对应

## Base
- `promise`是一种承诺，对应了三个状态 `pending`, `fulfilled`, `rejected`, 默认为`pending`
- 执行器`exector`会立即执行
- 执行器`exector`中，一旦成功，就不能失败，一旦失败，也不能成功

## v1
- 基本的`promise exector`执行器
- `exector`中的异步处理
- `exector`中的异常的处理
- `then`方法的实现

## v2
- `then`方法返回一个新的`promise`
- 实现`promise`的链式调用
- 兼容其他的`promise`，遵循`promise a+`规范

## v3
- 在链式调用的过程中，如果`resolve`返回的依然是一个`promise`的递归解析处理
- 链式调用中，如果`then`方法中没有传入成功或者失败的回调函数的兼容处理

## v4
- 测试`promise`是否符合`promise a+`规范
```
    npm install promises-aplus-tests -g
    promises-aplus-tests 4.MyPromise_v4.js
```