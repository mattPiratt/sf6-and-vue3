import {createStore} from 'vuex';
import usersModule from '@/store/modules/users/index.js';

const store = createStore({
    state() {
        return {
            isAjaxLoading: false,
        };
    },
    modules: {
        users: usersModule,
    },
    getters: {
        isAjaxLoading(state) {
            return state.isAjaxLoading;
        },
    },
    mutations: {
        setIsAjaxLoading(state, newVal) {
            state.isAjaxLoading = newVal;
        },
    },
});

export default store;
