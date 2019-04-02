let Promise = require("../8. MyPromise_v8");
let fs = require("fs");
function read(url){
    url = require("path").resolve(__dirname, url);
    return new Promise((resolve,reject)=>{
        fs.readFile(url, 'utf8', (err, data)=>{
            if(err) reject(err);
            resolve(data);
        });
    });
};

// Promise.all([read('../name.txt'), read('../age.txt'), 1,2,3]).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log("error", err);
// });

Promise.race([read('../name.txt'), read('../age.txt')]).then(data=>{
    console.log("success", data);
}).catch(err=>{
    console.log("error", err);
});