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
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    createdAt: '',
});
const showDeleteUserDialog = ref(false);
const showDeleteUserData = ref(false);

const fetchUsers = async (sortField = 'id') => {
    try {
        store.commit('setIsAjaxLoading', true, {root: true});

        const direction = store.getters['users/getSortDirection'];

        users.value = await dbStorageHelper.getUsers(sortField, direction);
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

const handleClose = () => {
    showAddEditUserDialog.value = false;
    showDeleteUserDialog.value = false;

    showAddEditUserData.value.id = null;
    showAddEditUserData.value.user_email = '';
    showAddEditUserData.value.first_name = '';
    showAddEditUserData.value.last_name = '';
    showAddEditUserData.value.created_at = '';
};

const addOrEditUserEvent = async (user = null) => {
    try {
        if (user) {
            const userDetailsFromDb = await dbStorageHelper.getUser(user.id);
            showAddEditUserData.value.id = userDetailsFromDb.id;
            showAddEditUserData.value.user_email = userDetailsFromDb.user_email;
            showAddEditUserData.value.first_name = userDetailsFromDb.first_name;
            showAddEditUserData.value.last_name = userDetailsFromDb.last_name;
            showAddEditUserData.value.created_at = userDetailsFromDb.created_at;
        }
        showAddEditUserDialog.value = true;
    } catch (error) {
        const toast = useToast();
        toast.error(error);
    }
};

const saveUserEvent = async (user) => {
    const toast = useToast();

    try {
        showAddEditUserDialog.value = false;
        store.commit('setIsAjaxLoading', true, {root: true});

        if (user.id) {
            await dbStorageHelper.updateUser(user);
        } else {
            await dbStorageHelper.addUser(user);
            store.dispatch('users/setSorting', {
                field: 'id',
                direction: 'desc'
            });
        }
        await fetchUsers(store.getters['users/getSortField']);

        toast.success('User updated successfully!');
    } catch (error) {
        toast.error('Failed to store data!');
    }
    store.commit('setIsAjaxLoading', false, {root: true});
};

const deleteUserEvent = async (user) => {
    showDeleteUserDialog.value = true;
    showDeleteUserData.value = user;
};
const deleteUserConfirmed = async (userId) => {
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
        <div class="header">
            <h1>User Management</h1>
            <base-button @click="addOrEditUserEvent()" style-mode="medium">Add User
            </base-button>
        </div>
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
                @save-changes="saveUserEvent"
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

.user-management .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
