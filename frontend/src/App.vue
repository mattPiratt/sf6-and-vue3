<script setup>
import UserManagement from './views/UserManagement.vue';
import TheHeader from './components/layout/TheHeader.vue';
</script>

<template>
    <TheHeader/>
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
