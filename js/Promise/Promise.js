/**
 * Created by mapbar_front on 2018/6/19.
 */
var LAST_ERROR = null;
var IS_ERROE = {};
function Promise(fn) {
    this._deferredState = 0;
    this._value = null;
    this._state = 0;
    this._deferreds = null;
    doResolve(fn, this);
}
function doResolve(fn, promise) {
    var done = false;
    var res = tryCallTwo(fn, function (value) {
        if(done) return;
        done = true;
        resolve(promise, value)
    },function (reason) {
        if(done) return;
        done = true;
        reject(promise, reason);
    });
    if(!done && res === IS_ERROE){
        done = true;
        reject(promise, LAST_ERROR);
    }
}
function tryCallTwo(fn, a, b) {
    try {
        return fn(a, b);
    } catch (err) {
        LAST_ERROR = err;
        return IS_ERROE;
    }
}
function tryCallOne(fn, a) {
    try {
        return fn(a);
    } catch (err) {
        LAST_ERROR = err;
        return IS_ERROE;
    }
}


/**
 * resolve这个函数的值和then函数相关。
 * @param self
 * @param newValue
 * @return {*}
 */
function resolve(self, newValue) {
    if(newValue === self) {
        return reject(  //@todo:目前还不知道为什么需要有返回值
            self,
            new TypeError('A promise cannot be resolved with itself.')
        )
    }


    self._state = 1;
    self._value = newValue;
    //@todo:
    finale(self)

}
function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;

    //@todo:
    finale(self)
}
function finale(self) {
    if (self._deferredState === 1) {
        handle(self, self._deferreds);
        self._deferreds = null;
    }
    if (self._deferredState === 2) {
        for (var i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};

function handle(self, deferred) {

    if(self._state ===0){
        if(self._deferredState == 0){
            self._deferredState = 1;
            self._deferreds = deferred;
            return;
        }

        if(self._deferredState ==1){
            self._deferredState = 2;
            self._deferreds = [self._deferreds, deferred];
            return;
        }
        self._deferreds.push(deferred);
        return;
    }
    handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
    var cb = self._state == 1 ? deferred.onFulfilled : deferred.onRejected;//这个cb其实就是then函数的回调
    var ret = tryCallOne(cb, self._value);//ret其实就是then中回调的返回值。
    if(ret == IS_ERROE){
        reject(deferred.promise, LAST_ERROR);
    } else {
        resolve(deferred.promise, ret);//resolve所做的东西，就是
    }
}

function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
    this.promise = promise;
}

function noop() {}