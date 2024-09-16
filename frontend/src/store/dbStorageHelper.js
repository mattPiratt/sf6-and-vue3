const API_URL = process.env.VUE_APP_API_URL;
import store from './index';

export default {
    async getUsers(sortField, direction) {
        store.commit('setIsAjaxLoading', true, {root: true});
        const apiField = mapVueToApiField(sortField);
        const response = await apiRequest(`/users?page=1&order%5B${apiField}%5D=${direction}`);
        const responseJson = await response.json();
        store.commit('setIsAjaxLoading', false, {root: true});
        return responseJson.map(user => mapApiToVueData(user));
    },
    async getUser(id) {
        store.commit('setIsAjaxLoading', true, {root: true});
        const response = await apiRequest(`/users/${id}`);
        const responseJson = await response.json();
        store.commit('setIsAjaxLoading', false, {root: true});
        return mapApiToVueData(responseJson);
    },
    async addUser(data) {
        store.commit('setIsAjaxLoading', true, {root: true});
        const apiData = mapVueToApiData(data);
        delete apiData.id;
        delete apiData.createdAt;
        await apiRequest(`/users`, {
            method: 'POST',
            body: JSON.stringify(apiData),
        });

        store.commit('setIsAjaxLoading', false, {root: true});
    },
    async updateUser(data) {
        store.commit('setIsAjaxLoading', true, {root: true});
        const apiData = mapVueToApiData(data);
        await apiRequest(`/users/${apiData.id}`, {
            method: 'PUT',
            body: JSON.stringify(apiData),
        });
        store.commit('setIsAjaxLoading', false, {root: true});
    },
    async deleteUser(id) {
        store.commit('setIsAjaxLoading', true, {root: true});
        await apiRequest(`/users/${id}`, {
            method: 'DELETE',
        });
        store.commit('setIsAjaxLoading', false, {root: true});
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

function mapVueToApiField(sortField) {
    return Object.keys(mapApiToVueField).reduce((acc, key) => {
        return mapApiToVueField[key] === sortField ? key : acc;
    }, '');
}

const mapApiToVueData = (user) => {
    return Object.keys(mapApiToVueField).reduce((acc, key) => {
        acc[mapApiToVueField[key]] = key === 'createdAt'
            ? new Date(user[key]).toISOString().slice(0, 16).replace('T', ' ')
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
