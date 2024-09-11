export default {
    getEmailSortDirection(state) {
        switch (state.emailSortDirection) {
            case 'asc':
                return 'asc';
            case 'desc':
                return 'desc';
            default:
                return '';
        }
    },
};
