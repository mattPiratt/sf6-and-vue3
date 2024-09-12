<script setup>
import UserManagement from './views/UserManagement.vue';
import TheHeader from './components/layout/TheHeader.vue';
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const errorMsg = computed(() => store.getters.errorMessage);

// store.commit('setErrorMessage', 'An error occured.');


const handleErrorClose = () => {
    store.commit('setErrorMessage', false);
    store.commit('setIsAjaxLoading', false, {root: true});
};


</script>

<template>
    <TheHeader/>
    <base-dialog
        :show="!!errorMsg"
        title="An error occured."
        @close="handleErrorClose"
    >
        <p>{{ errorMsg }}</p>
    </base-dialog>

    <UserManagement/>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
