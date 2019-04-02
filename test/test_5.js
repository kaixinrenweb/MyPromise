let Promise = require("../7. MyPromise_v7");

let promise = new Promise((resolve, reject)=>{
    reject(123);
});

// promise.then(data=>{
//     console.log("success", data);
// }, err=>{
//     console.log("error", err);
// }).catch(err=>{
//     console.log("catch...", err);
// });

promise.then(data=>{
    console.log("success", data);
}).catch(err=>{
    console.log("catch...", err);
    return 345;
}).then(data=>{
    console.log("data...", data);
});