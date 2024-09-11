import mutations from './mutators.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            emailSortDirection: [],
        };
    },
    mutations,
    getters,
    actions,
};
