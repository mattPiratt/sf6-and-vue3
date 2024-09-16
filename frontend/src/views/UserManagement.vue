<script setup>
import {onMounted, ref, watch} from 'vue';
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
        const direction = store.getters['users/getSortDirection'];

        users.value = await dbStorageHelper.getUsers(sortField, direction);
    } catch (error) {
        const toast = useToast();
        toast.error('Failed to load API data!');
    }
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



onMounted(() => {
    localStorageHelper.loadSortSettings();
    fetchUsers();
});

const handleClose = () => {
    showAddEditUserDialog.value = false;
    showDeleteUserDialog.value = false;
};
const cleanupAddEditUserData = () => {
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
        handleClose();
        if (user.id) {
            await dbStorageHelper.updateUser(user);
        } else {
            await dbStorageHelper.addUser(user);
            store.dispatch('users/setSorting', {
                field: 'id',
                direction: 'desc'
            });
        }
        cleanupAddEditUserData();

        await fetchUsers(store.getters['users/getSortField']);

        toast.success('User updated successfully!');
    } catch (error) {
        toast.error('Failed to store data!');
    }
};

const deleteUserEvent = async (user) => {
    showDeleteUserDialog.value = true;
    showDeleteUserData.value = user;
};
const deleteUserConfirmed = async (userId) => {
    const toast = useToast();

    try {
        handleClose();
        await dbStorageHelper.deleteUser(userId);
        cleanupAddEditUserData();

        await fetchUsers(store.getters['users/getSortField']);
    } catch (error) {
        toast.error('Failed to load API data!');
    }

    toast.success('User deleted successfully!');
};

</script>

<template>
    <div class="user-management">
        <div class="header">
            <h1>User Management</h1>
            <base-button @click="addOrEditUserEvent()" style-mode="medium">Add User
            </base-button>
        </div>
        <UserList :users="users"
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

<style lang="scss" scoped>
@import '@/assets/_mixins.scss';

.user-management {
    padding: 20px;

    .header {
        @include flex-center(space-between);
    }
}
</style>
