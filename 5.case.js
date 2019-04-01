let MyPromise = require("./4. MyPromise_v4");

let fs = require("fs");

function read(url){
    let defer = MyPromise.deferred();
    fs.readFile(url, 'utf8', (err, data)=>{
        if(err) return defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read(require("path").resolve(__dirname, 'name.txt')).then(data=>{
    console.log(data);
});