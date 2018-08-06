/**
 * Created by mapbar_front on 2018/8/6.
 */
function thunkify(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var ctx = this;
        return function (cb) {
            var isCalled = false;

            args.push(function () {
               if (isCalled) return;
               isCalled = true;
               cb.apply(ctx, arguments)
            });
            try {
                fn.apply(this, args);
            } catch (e) {
                cb(e);
            }

        }
    }
}