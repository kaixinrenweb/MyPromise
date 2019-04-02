let MyPromise = require("../6. MyPromise_v6");

let promise = new MyPromise((resolve, reject)=>{
    resolve(new MyPromise((resolve, reject)=>{
        setTimeout(_=>{
            reject(234);
        }, 1000);
    }));
});

promise.then(data=>{
    console.log("success", data);
}, err=>{
    console.log("error", err);
});