<template>
    <div class="user-management">
        <h1>User Management</h1>
        <UserList :users="users"/>
        <!-- Add/Modify and Delete modals will be inserted here later -->
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import UserList from '@/components/users/UserList.vue';
import dbConnector from "@/store/dbConnectionHelper";
import {useToast} from "vue-toastification";

const users = ref([]);

const fetchUsers = async () => {
    const loadedUsers = await dbConnector.loadUsers();
    users.value = loadedUsers.map(user => ({
        ID: user.id,
        user_email: user.userEmail,
        first_name: user.firstName,
        last_name: user.lastName,
        created_at: new Date(user.createdAt).toISOString()
            .slice(0, 16).replace('T', ' '),
    }));
    const toast = useToast();
    toast.success('API data loaded successfully!');
};

onMounted(fetchUsers);
</script>

<style scoped>
.user-management {
    padding: 20px;
}
</style>
