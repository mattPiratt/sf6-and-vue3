<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useToast} from "vue-toastification";
import {useStore} from "vuex";
import UserList from '@/components/users/UserList.vue';
import dbStorageHelper from "@/store/dbStorageHelper";
import localStorageHelper from "@/store/localStorageHelper";


const users = ref([]);
const store = useStore();

const fetchUsers = async (templateField = 'id') => {
    try {
        store.commit('setIsAjaxLoading', true, {root: true});

        const direction = store.getters['users/getSortDirection'];

        let field;
        switch (templateField) {
            case 'id':
                field = 'id';
                break;
            case 'email':
                field = 'userEmail';
                break;
            case 'firstName':
                field = 'firstName';
                break;
            case 'lastName':
                field = 'lastName';
                break;
            case 'createdAt':
                field = 'createdAt';
                break;
        }

        const loadedUsers = await dbStorageHelper.loadUsers(field, direction);
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

watch([
    () => store.getters['users/getSortField'],
    () => store.getters['users/getSortDirection']
], ([
        newSortField,
              newSortDirection
    ]) => {
    fetchUsers(newSortField);
    localStorageHelper.saveSortSettings(newSortField, newSortDirection);
});

const isLoading = computed(() => {
    return store.getters.isAjaxLoading;
});

onMounted(() => {
    localStorageHelper.loadSortSettings();
    fetchUsers();
});

</script>

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

<style scoped>
.user-management {
    padding: 20px;
}
</style>
