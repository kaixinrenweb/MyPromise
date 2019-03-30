let Promise = require("../3. MyPromise_v3");

const promise = new Promise((resovle, reject)=>{
    setTimeout(()=>{
        resovle(123);
    }, 1000);
    // throw new Error("errosss");
});

// promise.then(null, err=>{
//     console.log("finally", err);
// })

// promise.then().then(null, err=>{
//     console.log("finally", err);
// });

// promise.then().then().then().then(data=>{
//     console.log('data...', data);
// });

let promise2 = promise.then(data=>{
    console.log('1111----', data);
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            resolve(555);
        }));
    });
},err=>{
    console.log('1111----', err);
});

promise2.then(data=>{
    console.log('2222----', data);
}, err=>{
    console.log('2222----', err);
});