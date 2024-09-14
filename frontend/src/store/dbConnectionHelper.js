const API_URL = process.env.VUE_APP_API_URL;

export default {
    async loadUsers(field, direction) {
        const response = await fetch(`${API_URL}/users?page=1&order%5B${field}%5D=${direction}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            console.log('HTTP Request failed (01)');
            throw new Error(
                response.message || 'HTTP error:Failed to fetch list.'
            );
        }
        return await response.json();
    },
    async addUser(id, data) {
        const response = await fetch(
            `${API_URL}/users`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error(
                response.message || 'HTTP error: Failed to add new.'
            );
        }
    },
    async updateUser(id, data) {
        const response = await fetch(
            `${API_URL}/users/${id}`,
            {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error(
                response.message || 'HTTP error: Failed to update.'
            );
        }
    },
    async deleteUser(id) {
        const response = await fetch(
            `${API_URL}/users/${id}`,
            {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                },
            }
        );
        if (!response.ok) {
            throw new Error(
                response.message || 'HTTP error: Failed to delete.'
            );
        }
    },
};
