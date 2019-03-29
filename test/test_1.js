let MyPromise = require("../1. MyPromise_v1");

const promise = new MyPromise((resolve, reject)=>{
    // resolve(123);
    // reject('err');
    // throw new Error("失败了");
    setTimeout(_=>{
        resolve("成功");
    }, 1000);
});

promise.then(data=>{
    console.log("success", data);
}, error=>{
    console.log("error", error);
});