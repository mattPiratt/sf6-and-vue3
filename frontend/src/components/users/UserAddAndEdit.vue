<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue';
import {validateForm, validateOneField} from "@/composables/formValidation";

const props = defineProps({
    id: {
        type: Number,
        required: false,
        default: null,
    },
    user_email: String,
    first_name: String,
    last_name: String,
    created_at: String,
});

const emit = defineEmits(['save-changes', 'close']);

const isFormValid = ref(true);

const form = ref({
    user_email: {
        value: props.user_email,
        isValid: true,
        validator: (self) => {
            const emailAddress = self.value;
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
        },
    },
    first_name: {
        value: props.first_name,
        isValid: true,
        validator: (self) => {
            return self.value !== '';
        },
    },
    last_name: {
        value: props.last_name,
        isValid: true,
        validator: (self) => {
            return self.value !== '';
        },
    },
    created_at: {
        value: props.created_at,
        isValid: true,
        validator: null,
    },
});

watch(props, (newProps) => {
    form.value.user_email = newProps.user_email;
    form.value.first_name = newProps.first_name;
    form.value.last_name = newProps.last_name;
    form.value.created_at = newProps.created_at;
}, {deep: true});

const submitForm = () => {
    isFormValid.value = validateForm(form.value);

    if (isFormValid.value === false) {
        return false;
    }

    const data = {
        id: props.id,
        user_email: form.value.user_email.value,
        first_name: form.value.first_name.value,
        last_name: form.value.last_name.value,
        created_at: form.value.created_at.value,
    };
    emit('save-changes', data);
};
</script>

<template>
    <div class="add-and-edit-user">
        <div class="form-group">
            <label>Email</label>
            <input type="email"
                   v-model.trim="form.user_email.value"
                   @blur="validateOneField('user_email', form)"
            >
            <div class="validation-error">
                <p v-if="!form.user_email.isValid">User email is invalid</p>
            </div>
        </div>
        <div class="form-group">
            <label>First Name</label>
            <input type="text"
                   v-model.trim="form.first_name.value"
                   @blur="validateOneField('first_name', form)"
            >
            <div class="validation-error">
                <p v-if="!form.first_name.isValid">First name must not be empty</p>
            </div>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text"
                   v-model.trim="form.last_name.value"
                   @blur="validateOneField('last_name', form)"
            >
            <div class="validation-error">
                <p v-if="!form.last_name.isValid">Last name must not be empty</p>
            </div>
        </div>
        <p v-if="!isFormValid">
            <strong>Please fix above problems and try again.</strong>
        </p>
        <base-button @click="emit('close')">Close</base-button>
        <base-button @click="submitForm" class="float-right">Save Changes</base-button>
    </div>

</template>

<style lang="scss" scoped>
.add-and-edit-user {
    margin-top: 20px;

    .form-group {
        margin-bottom: 1rem;

        label {
            display: block;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        input {
            width: 95%;
            padding: 0.5rem;
            font: inherit;
            border-radius: 4px;
            border: 1px solid $primary-color;
        }

        .validation-error {
            height: 1.5rem;
            margin: 0;
            padding-top: 0.5rem;

            p {
                color: $validation-error-color;
                margin-top: 0;
            }
        }
    }
}
</style>
