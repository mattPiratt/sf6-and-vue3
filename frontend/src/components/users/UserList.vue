<script setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['edit-user', 'delete-user']);
</script>

<template>
    <div class="user-list">
        <table>
            <thead>
            <tr>
                <base-sortable-header sort-field="id">ID</base-sortable-header>
                <base-sortable-header sort-field="user_email">Email</base-sortable-header>
                <base-sortable-header sort-field="first_name">First Name</base-sortable-header>
                <base-sortable-header sort-field="last_name">Last Name</base-sortable-header>
                <base-sortable-header sort-field="created_at">Created At</base-sortable-header>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in props.users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.user_email }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.created_at }}</td>
                <td>
                    <!-- Buttons for edit and delete (to be implemented) -->
                    <base-button @click="emit('edit-user', user)" style-mode="outline">Edit</base-button>
                    <base-button @click="emit('delete-user', user)">Delete</base-button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.user-list {
    margin-top: 20px;
}

.user-list table {
    width: 100%;
    border-collapse: collapse;
}

th {
    border: 1px solid #ddd;
    padding: 8px;
    line-height: 2rem;
    user-select: none;
    width: 15%;
}

.user-list td {
    border: 1px solid #ddd;
    padding: 8px;
}

</style>
