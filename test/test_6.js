let Promise = require("../7. MyPromise_v7");

// Promise.resolve(123).then(data=>{
//     console.log("success", data);
// });

Promise.reject(345).catch(err=>{
    console.log(err);
});