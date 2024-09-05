<template>
    <div class="user-management">
        <h1>User Management</h1>
        <UserList :users="users"/>
        <!-- Add/Modify and Delete modals will be inserted here later -->
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import UserList from '../components/UserList.vue';

const users = ref([]);

const fetchUsers = async () => {
    // Replace this with your API endpoint
};

onMounted(fetchUsers);
</script>

<style scoped>
.user-management {
    padding: 20px;
}
</style>
