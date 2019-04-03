function MyPromise(exector) {
    let self = this;
    this.status = "pending";            //定义状态
    this.value = undefined;             //定义成功的数据
    this.reason = undefined;            //定义失败的原因
    this.onFulfilledCallBacks = [];     //定义then成功的函数
    this.onRejectedCallBacks  = [];     //定义then失败的函数
    //定义resolve
    function resolve(value){
        //如果value是promise的情况
        if(value instanceof MyPromise){
            return value.then(y=>{
                resolve(y); //递归
            },r=>{
                reject(r);
            });
        }
        if(self.status=='pending'){
            self.value = value;
            self.status = 'fulfilled';
            self.onFulfilledCallBacks.forEach(fn=>fn());
        }
    }
    //定义reject
    function reject(reason){
        if(self.status=='pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallBacks.forEach(fn=>fn());
        }
    }
    //exector 直接执行
    try {
        exector(resolve, reject);
    }catch(e){
        reject(e);
    }
}

//处理返回值的
function resolvePromise(promise2, x, resolve, reject){
    if(promise2==x){
        throw new TypeError("循环引用");
    }
    let called; //为了兼容别人的promise,万一别人的promise没有保证一旦成功不能失败的规则
    if(x!=null && (typeof x=='object' || typeof x=='function')){
        try {
            let then = x.then;
            if(typeof then=='function'){ //promise
                then.call(x, y=>{ //如果y依然返回的是一个promise， 递归解析
                    // resolve(y);
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                },r=>{
                    if(called) return;
                    called = true;
                    reject(r);
                });
            }else{ // {then:11/undefined}
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        }
    }else{
        resolve(x);
    }
}

// then方法
MyPromise.prototype.then = function(onFulfilled, onRejected){
    // 如果then方法中没有传入成功或者失败的回调函数，则依次往下传
    onFulfilled = typeof onFulfilled=='function' ? onFulfilled : val=>val;
    onRejected  = typeof onRejected=='function' ? onRejected : err=>{throw err};
    let self = this;
    // 执行后返回一个新的promise2
    let promise2 = new MyPromise((resolve, reject)=>{
        if(self.status==='fulfilled'){
            // 加定时器，因为此时promise2还未能获取到
            setTimeout(()=>{
                // 在执行代码的过程中万一有异常，需要捕获
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        }
        if(self.status==='rejected'){
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }catch(e){
                    reject(e);
                }
            });
        }
        if(self.status==='pending'){
            self.onFulfilledCallBacks.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
            self.onRejectedCallBacks.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}

//catch捕获错误的方法
MyPromise.prototype.catch = function(errFn){
    return this.then(null, errFn);
};

// Promise.resolve
MyPromise.resolve = function(value){
    return new MyPromise((resolve, reject)=>{
        resolve(value);
    });
};

//Promise.reject
MyPromise.reject = function(reason){
    return new MyPromise((resolve, reject)=>{
        reject(reason);
    });
};

//Promise.all
MyPromise.all = function(values){
    return new MyPromise((resolve, reject)=>{
        let arr = [];
        let index = 0;
        function processData(key, val){
            arr[key] = val;
            if(++index === values.length){ //最终结果的个数和values的个数相等，抛出结果即可
                resolve(arr);
            }
        }
        for(let i=0; i<values.length; i++){
            let current = values[i];
            if(current && current.then && typeof current.then==='function'){ //promise
                current.then(y=>{
                    processData(i, y);
                },reject);
            }else{
                processData(i, current);
            }
        }
    });
};

//Promise.race
MyPromise.race = function(values){
    return new MyPromise((resolve, reject)=>{
        for(let i=0; i<values.length; i++){
            let current = values[i];
            let then = current.then;
            if(current && then && typeof then==='function'){
                then.call(current, y=>{
                    resolve(y);
                }, reject);
            }else{
                resolve(current);
            }
        }
    });
};  

//test promise
MyPromise.defer = MyPromise.deferred = function(){
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject  = reject;
    });
    return dfd;
};

module.exports = MyPromise;