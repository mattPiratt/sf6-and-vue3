<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useToast} from "vue-toastification";
import {useStore} from "vuex";
import UserList from '@/components/users/UserList.vue';
import dbStorageHelper from "@/store/dbStorageHelper";
import localStorageHelper from "@/store/localStorageHelper";
import UserAddAndEdit from "@/components/users/UserAddAndEdit.vue";

const users = ref([]);
const store = useStore();
const showAddEditUserDialog = ref(false);
const showAddEditUserData = ref({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    createdAt: '',
});
const showDeleteUserDialog = ref(false);
const showDeleteUserData = ref(false);

const fetchUsers = async (sortField = 'id') => {
    const toast = useToast();

    try {
        store.commit('setIsAjaxLoading', true, {root: true});

        const direction = store.getters['users/getSortDirection'];

        users.value = await dbStorageHelper.getUsers(sortField, direction);
    } catch (error) {
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

const handleClose = () => {
    showAddEditUserDialog.value = false;
    showDeleteUserDialog.value = false;
};

const addOrEditUserEvent = async (user) => {
    showAddEditUserDialog.value = true;
    const toast = useToast();

    try {
        const userDetailsFromDb = await dbStorageHelper.getUser(user.id);
        showAddEditUserData.value.id = userDetailsFromDb.id;
        showAddEditUserData.value.user_email = userDetailsFromDb.user_email;
        showAddEditUserData.value.first_name = userDetailsFromDb.first_name;
        showAddEditUserData.value.last_name = userDetailsFromDb.last_name;
        showAddEditUserData.value.created_at = userDetailsFromDb.created_at;
        showAddEditUserDialog.value = true;
    } catch (error) {
        toast.error(error);
    }
};
const saveUserChangesEvent = async (user) => {
    const toast = useToast();

    try {
        showAddEditUserDialog.value = false;
        store.commit('setIsAjaxLoading', true, {root: true});
        await dbStorageHelper.updateUser(user);
        await fetchUsers(store.getters['users/getSortField']);
    } catch (error) {
        toast.error('Failed to load API data!');
    }

    toast.success('User updated successfully!');
    store.commit('setIsAjaxLoading', false, {root: true});
};

const deleteUserEvent = async (user) => {
    console.log('Delete user event', user);

    showDeleteUserDialog.value = true;
    showDeleteUserData.value = user;
};
const deleteUserConfirmed = async (userId) => {
    console.log('Delete user confirmed', userId);

    const toast = useToast();
    try {
        showDeleteUserDialog.value = false;
        store.commit('setIsAjaxLoading', true, {root: true});
        await dbStorageHelper.deleteUser(userId);
        await fetchUsers(store.getters['users/getSortField']);
    } catch (error) {
        toast.error('Failed to load API data!');
    }
    toast.success('User deleted successfully!');
    store.commit('setIsAjaxLoading', false, {root: true});
};

</script>

<template>
    <div class="user-management">
        <h1>User Management</h1>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <UserList v-else :users="users"
                  @edit-user="addOrEditUserEvent"
                  @delete-user="deleteUserEvent"
        />

        <base-dialog
            v-bind:show="showAddEditUserDialog"
            key="showAddEditUser"
            title="Add/Edit user entry"
            @close="handleClose"
        >
            <user-add-and-edit
                v-bind="showAddEditUserData"
                @save-changes="saveUserChangesEvent"
                @close="handleClose"
            ></user-add-and-edit>
        </base-dialog>

        <base-dialog
            v-bind:show="showDeleteUserDialog"
            key="deleteUser"
            title="Delete user entry"
            @close="handleClose"
        >
            <p>Are you sure you want to delete <strong>{{ showDeleteUserData.first_name }}
                {{ showDeleteUserData.last_name }}</strong>?</p>
            <base-button @click="handleClose">Close</base-button>
            <base-button @click="deleteUserConfirmed(showDeleteUserData.id)" class="float-right">Delete</base-button>
        </base-dialog>

    </div>
</template>

<style scoped>
.user-management {
    padding: 20px;
}
</style>
