const API_URL = process.env.VUE_APP_API_URL;

export default {
    async getUsers(sortField, direction) {
        const apiField = mapApiToVueField[sortField];
        const response = await apiRequest(`/users?page=1&order%5B${apiField}%5D=${direction}`);
        const responseJson = await response.json();
        return responseJson.map(user => mapApiToVueData(user));
    },
    async getUser(id) {
        const response = await apiRequest(`/users/${id}`);
        const responseJson = await response.json();
        return mapApiToVueData(responseJson);
    },
    async addUser(data) {
        await apiRequest(`/users/${data.id}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    async updateUser(data) {
        const apiData = mapVueToApiData(data);
        console.log("updateUser db Helper:", apiData);
        await apiRequest(`/users/${apiData.id}`, {
            method: 'PUT',
            body: JSON.stringify(apiData),
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
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        ...options,
    };
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        const errorMessage = response.message || `HTTP error! Request ${url} returned status: ${response.status}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return response;
}

const mapApiToVueField = {
    id: 'id',
    userEmail: 'user_email',
    firstName: 'first_name',
    lastName: 'last_name',
    createdAt: 'created_at',
}
const mapApiToVueData = (user) => {
    return Object.keys(mapApiToVueField).reduce((acc, key) => {
        acc[mapApiToVueField[key]] = key === 'created_at'
            ? new Date(user[mapApiToVueField[key]]).toISOString().slice(0, 16).replace('T', ' ')
            : user[key];
        return acc;
    }, {});
};
const mapVueToApiData = (user) => {
    return Object.keys(mapApiToVueField).reduce((acc, key) => {
        acc[key] = user[mapApiToVueField[key]];
        return acc;
    }, {});
};
