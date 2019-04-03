let obj = {0:1, 1:2, 2:3, length:3};
let objs = Array.from(obj);

for(let key of objs){
    console.log(key);
}