// generator 生成器 
// iterator  迭代器
// 迭代器有一个next的方法，每次调用后都会返回value, done两个属性
// 类数组，有长度，有索引 是个对象，能被迭代

//给一个对象添加迭代器，可以使他被迭代
// let obj = {0:1, 1:2, 2:3, length:3, [Symbol.iterator]:function(){
//     let self  = this;
//     let index = 0;
//     return { //迭代器
//         next(){
//             return { value:self[index], done:index++===self.length };
//         }
//     }
// }};

//给一个对象添加生成器，可以生成迭代器，使他可以迭代
let obj = {0:1, 1:2, 2:3, length:3, [Symbol.iterator]:function* (){
    //每次浏览器都会不停的调用next方法，把yield结果作为值
    let index = 0;
    while(index !== this.length){
        yield this[index++];
    }
}};

for(let key of obj){
    console.log(key);
}

// function arg(){
//     let arr = [...arguments];
//     console.log(arr);
// }
// arg(1,2,3);