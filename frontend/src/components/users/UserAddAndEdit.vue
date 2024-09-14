<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue';

const props = defineProps({
    id: Number,
    user_email: String,
    first_name: String,
    last_name: String,
    created_at: String,
});

const emit = defineEmits(['save-changes', 'close']);

const user_email = ref(props.user_email);
const first_name = ref(props.first_name);
const last_name = ref(props.last_name);
const created_at = ref(props.created_at);

watch(props, (newProps) => {
    user_email.value = newProps.user_email;
    first_name.value = newProps.first_name;
    last_name.value = newProps.last_name;
    created_at.value = newProps.created_at;
}, {deep: true});

</script>

<template>
    <div class="add-and-edit-user">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user_email">
        </div>
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model="first_name">
        </div>
        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="last_name">
        </div>
        <div class="form-group">
            <label for="createdAt">Created At</label>
            <input type="text" id="createdAt" v-model="created_at">
        </div>
        <base-button @click="emit('close')">Close</base-button>
        <base-button @click="emit('save-changes', {
            id: props.id,
            user_email: user_email,
            first_name: first_name,
            last_name: last_name,
            created_at: created_at,
            })" class="float-right">Save Changes
        </base-button>
    </div>
</template>

<style scoped>
.add-and-edit-user {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.5rem;
    font: inherit;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.float-right {
    float: right;
}
</style>
