import store from './index';

export default {
    loadSortSettings() {
        const savedSortField = localStorage.getItem('sortField');
        const savedSortDirection = localStorage.getItem('sortDirection');
        if (savedSortField && savedSortDirection) {
            store.dispatch('users/setSorting', {
                field: savedSortField,
                direction: savedSortDirection
            });
        }
    },
    saveSortSettings(sortField, sortDirection) {
        localStorage.setItem('sortField', sortField);
        localStorage.setItem('sortDirection', sortDirection);
    }
};

