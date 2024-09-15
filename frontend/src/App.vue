<script setup>
import UserManagement from '@/views/UserManagement.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
</script>

<template>
    <TheHeader/>
    <UserManagement/>
</template>

<style lang="scss">
#app {
    font-family: $font-stack;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
}

.float-right {
    float: right;
}
</style>
