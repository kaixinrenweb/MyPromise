function MyPromise(exector) {
    let self = this;
    this.status = "pending";            //定义状态
    this.value = undefined;             //定义成功的数据
    this.reason = undefined;            //定义失败的原因
    this.onFulfilledCallBacks = [];     //定义then成功的函数
    this.onRejectedCallBacks  = [];     //定义then失败的函数
    //定义resolve
    function resolve(value){
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

// then方法
MyPromise.prototype.then = function(onFulfilled, onRejected){
    let self = this;
    if(this.status==='fulfilled'){
        onFulfilled(this.value);
    }
    if(this.status==='rejected'){
        onRejected(this.reason);
    }
    if(this.status==='pending'){
        this.onFulfilledCallBacks.push(()=>{
            onFulfilled(self.value);
        });
        this.onRejectedCallBacks.push(()=>{
            onRejected(self.reason);
        });
    }
}

module.exports = MyPromise;