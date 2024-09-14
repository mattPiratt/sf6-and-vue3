export default {
    setSorting({commit}, data) {
        commit('setSortField', data.field);
        commit('setSortDirection', data.direction);
    },
};
