<script setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['edit-user', 'delete-user']);

const editUser = (user) => {
    emit('edit-user', user);
};

const confirmDeleteUser = (user) => {
    emit('delete-user', user);
};
</script>

<template>
    <div class="user-list">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in props.users" :key="user.ID">
                <td>{{ user.ID }}</td>
                <td>{{ user.user_email }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.created_at }}</td>
                <td>
                    <!-- Buttons for edit and delete (to be implemented) -->
                    <base-button @click="editUser(user)" style-mode="outline">Edit</base-button>
                    <base-button @click="confirmDeleteUser(user)">Delete</base-button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.user-list {
    margin-top: 20px;
}

.user-list table {
    width: 100%;
    border-collapse: collapse;
}

.user-list th, .user-list td {
    border: 1px solid #ddd;
    padding: 8px;
}

.user-list th {
    background-color: #f2f2f2;
    text-align: left;
}
</style>
