import mutations from './mutators.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            sortField: 'id',
            sortDirection: 'asc',
        };
    },
    mutations,
    getters,
    actions,
};
