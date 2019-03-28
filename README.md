# MyPromise
- 自己封装的一个promise
- 旨在关注promise的内部原理
- 虽然在开发的过程中不会使用自己封装的promise，但是自己去封装，就会对promise的内容运行的原理比较的了解，这样有助于在开发的过程中遇到问题，也能很快的定位问题，从而解决问题

# Process
- 一部分一部分的完善
- v1...表示每个版本的完善

# Base
- promise是一种承诺，对应了三个状态 pending, fulfilled, rejected,默认为pending
- 执行器exector会立即执行
- 执行器exector中，一旦成功，就不能失败，一旦失败，也不能成功

# v1
- 基本的promise exector执行器
- exector中的异步处理
- exector中的异常的处理
- then方法的实现
