<template>
    <div class="user-management">
        <h1>User Management</h1>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <UserList v-else :users="users"/>
        <!-- Add/Modify and Delete modals will be inserted here later -->
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {useToast} from "vue-toastification";
import {useStore} from "vuex";
import UserList from '@/components/users/UserList.vue';
import dbConnector from "@/store/dbConnectionHelper";


const users = ref([]);
const store = useStore();

const fetchUsers = async () => {
    try {
        store.commit('setIsAjaxLoading', true, {root: true});
        const loadedUsers = await dbConnector.loadUsers();
        users.value = loadedUsers.map(user => ({
            ID: user.id,
            user_email: user.userEmail,
            first_name: user.firstName,
            last_name: user.lastName,
            created_at: new Date(user.createdAt).toISOString()
                .slice(0, 16).replace('T', ' '),
        }));
    } catch (error) {
        const toast = useToast();
        toast.error('Failed to load API data!');
    }
    store.commit('setIsAjaxLoading', false, {root: true});
};

const isLoading = computed(() => {
    return store.getters.isAjaxLoading;
});

onMounted(fetchUsers);
</script>

<style scoped>
.user-management {
    padding: 20px;
}
</style>
