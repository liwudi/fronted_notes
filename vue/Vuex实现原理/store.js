/**
 * Created by mapbar_front on 2020-01-21.
 */
let Vue;
export class Store {
    constructor(options = {}) {
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        });

        this._mutations = options.mutations || Object.create(null);
        this._actions = options.actions || Object.create(null);
    }
    get state () {
        return this._vm._data.$$state
    }

    commit (type, payload, _options) {
        const entry = this._mutations[type];
        entry(this._vm._data.$$state, payload)
    }

    dispatch (type, payload) {
        const entry = this._actions[type];
        entry(this, payload)
    }
}
function vueInit() {
    let options = this.$options;
    if (options.store) {
        this.$store = options.store;
    } else if (!options.store && options.parent.$store) {
        this.$store = options.parent.$store;
    }
}
export function install(_Vue) {
    Vue = _Vue;
    Vue.mixins({
        beforeCreate: vueInit
    })
}
