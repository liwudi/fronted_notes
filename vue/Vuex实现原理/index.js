/**
 * Created by mapbar_front on 2020-01-21.
 */
// 这是基本的使用示例
import Vue from 'vue';
import Vuex from './Vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment: function (state) {
            state.count++;
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        }
    }
});
export default store;
