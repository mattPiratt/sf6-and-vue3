const API_URL = process.env.VUE_APP_API_URL;

export default {
    async loadUsers(field, direction) {
        const response = await apiRequest(`/users?page=1&order%5B${field}%5D=${direction}`);
        return await response.json();
    },
    async addUser(id, data) {
        await apiRequest(`/users/${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    async updateUser(id, data) {
        await apiRequest(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    async deleteUser(id) {
        await apiRequest(`/users/${id}`, {
            method: 'DELETE',
        });
    },
};

async function apiRequest(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const requestOptions = {
        ...options,
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        const errorMessage = response.message || `HTTP error! Request ${url} returned status: ${response.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return response;
}
