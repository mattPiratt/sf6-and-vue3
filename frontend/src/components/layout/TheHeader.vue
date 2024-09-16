<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();

const isLoading = computed(() => {
    return store.getters.isAjaxLoading;
});
</script>

<template>
    <header>
        <nav>
            <h1>
                Upfront demo app!
            </h1>
            <div v-if="isLoading" class="spinner-container">
                <base-spinner></base-spinner>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@import '@/assets/_mixins.scss';
@import '_header.scss';

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        margin: 1rem;
    }

    .spinner-container {
        margin-right: 3rem;
    }
}
</style>
