const API_URL = process.env.VUE_APP_API_URL;

export default {
    async getUsers(sortField, direction) {
        const apiField = mapVueToApiField(sortField);
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

const mapVueToApiField = (vueField) => {
    let apiField;
    switch (vueField) {
        case 'id':
            apiField = 'id';
            break;
        case 'user_email':
            apiField = 'userEmail';
            break;
        case 'first_name':
            apiField = 'firstName';
            break;
        case 'last_name':
            apiField = 'lastName';
            break;
        case 'created_at':
            apiField = 'createdAt';
            break;
    }
    return apiField;
};
const mapApiToVueData = (user) => {
    return {
        id: user.id,
        user_email: user.userEmail,
        first_name: user.firstName,
        last_name: user.lastName,
        created_at: new Date(user.createdAt).toISOString()
            .slice(0, 16).replace('T', ' '),
    }
};
const mapVueToApiData = (user) => {
    return {
        id: user.id,
        userEmail: user.user_email,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
    }
}
