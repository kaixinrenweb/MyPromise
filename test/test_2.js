let Promise = require("../2. MyPromise_v2");

const promise = new Promise((resolve, reject)=>{
    resolve(123);
});

let promise2 = promise.then(data=>{
    console.log(data, 'success-1111');
    // return {dd:111};
    // return new Promise((resolve,reject)=>{
    //     setTimeout(_=>{
    //         resolve(222);
    //     }, 1000);
    // });
    // throw new Error("errrr");
}, err=>{
    console.log(err, 'err-1111');
    // return 125;
    // throw new Error("errrr");
});

promise2.then(data=>{
    console.log(data, 'success-2222');
},err=>{
    console.log(err, 'err-2222');
});