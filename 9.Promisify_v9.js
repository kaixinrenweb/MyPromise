let fs = require("fs");
let MyPromise = require("./8. MyPromise_v8");

// fs.readFile(require("path").resolve(__dirname, "./name.txt"), 'utf8', (err,data)=>{
//     if(err) return err;
//     console.log(data);
// });

let read = promisify(fs.readFile);

read(require("path").resolve(__dirname, "./name.txt"), 'utf8').then(data=>{
    console.log('success',data);
}).catch(err=>{
    console.log("error", err);
});

//promisify
function promisify(fn){ // 将这个fn -> promisify化
    return function(){
        return new MyPromise((resolve, reject)=>{
            fn(...arguments, function(err, data){
                if(err) reject(err);
                resolve(data);
            });
        });
    }
}