import {createStore} from 'vuex';
import usersModule from '@/store/modules/users/index.js';

const store = createStore({
    state() {
        return {
            isAjaxLoading: false,
            errorMessage: false,
        };
    },
    modules: {
        users: usersModule,
    },
    getters: {
        isAjaxLoading(state) {
            return state.isAjaxLoading;
        },
        errorMessage(state) {
            return state.errorMessage;
        },
    },
    mutations: {
        setIsAjaxLoading(state, newVal) {
            state.isAjaxLoading = newVal;
        },
        setErrorMessage(state, newVal) {
            state.errorMessage = newVal;
        },
    },
});

export default store;
