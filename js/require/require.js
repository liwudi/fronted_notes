/**
 * Created by mapbar_front on 2018/6/19.
 */
var define, requireModule, require, requirejs;

(function() {
    //registry: 维护了一个注册的模块的列表。
    var registry = {}, seen = {};

    //define函数: 就是把这个模块的依赖，回调，模块名记录到registry对象中。
    define = function(name, deps, callback) {
        registry[name] = { deps: deps, callback: callback };
    };

    requirejs = require = requireModule = function(name) {
        requirejs._eak_seen = registry;

        if (seen[name]) { return seen[name]; }
        seen[name] = {};//到了这一步，默认把seen这个对象维护就是require的一个模块列表。

        if (!registry[name]) {
            throw new Error("Could not find module " + name);
        }

        //mod: 这个代表的name对应的一个注册列表中的对象—— { deps: deps, callback: callback }
        var mod = registry[name],
            deps = mod.deps,//找到模块名为name的依赖模块。
            callback = mod.callback,//找到模块名为name的回调。
            reified = [],
            exports;

        for (var i=0, l=deps.length; i<l; i++) {
            if (deps[i] === 'exports') {
                reified.push(exports = {});
            } else {
                reified.push(requireModule(resolve(deps[i])));
            }
        }

        var value = callback.apply(this, reified);
        return seen[name] = exports || value;

        //这个child参数应该是个路径。
        function resolve(child) {
            if (child.charAt(0) !== '.') { return child; }
            var parts = child.split("/");
            var parentBase = name.split("/").slice(0, -1);

            for (var i=0, l=parts.length; i<l; i++) {
                var part = parts[i];

                if (part === '..') { parentBase.pop(); }
                else if (part === '.') { continue; }
                else { parentBase.push(part); }
            }

            return parentBase.join("/");
        }
    };
})();