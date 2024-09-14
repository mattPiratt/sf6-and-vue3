export default {
    getSortDirection(state) {
        switch (state.sortDirection) {
            case 'asc':
                return 'asc';
            case 'desc':
                return 'desc';
            default:
                return '';
        }
    },
    getSortField(state) {
        return state.sortField;
    }
};
