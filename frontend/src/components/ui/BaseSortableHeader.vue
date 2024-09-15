<script setup>
import {defineProps, ref, watch} from 'vue';
import {useStore} from 'vuex';

const props = defineProps({
    sortField: {
        type: String,
        required: true,
    },
    sortDirection: {
        type: String,
        required: false,
        default: '',
    }
});
const store = useStore();

let sortField = ref(props.sortField);
let sortDirection = ref(props.sortDirection);

const toggleSort = () => {
    store.dispatch('users/setSorting', {
        field: sortField.value,
        direction: sortDirection.value === 'asc' ? 'desc' : 'asc'
    });
};

watch([
    () => store.getters['users/getSortField'],
    () => store.getters['users/getSortDirection']
], ([
        newSortField
    ]) => {
    if (sortField.value !== newSortField) {
        sortDirection.value = '';
    } else {
        sortDirection.value = store.getters['users/getSortDirection'];
    }
}, {immediate: true});

</script>

<template>
    <th @click="toggleSort()">
        <slot></slot>
        <span class="orderDirection">
            {{ sortDirection === 'asc' ? '⬆' : sortDirection === 'desc' ? '⬇' : '' }}
        </span>
    </th>
</template>

<style lang="scss" scoped>
th {
    border: 1px solid $table-border-color;
    padding: 8px;
    background-color: $secondary-color;
    text-align: left;
    cursor: pointer;
    line-height: 2rem;
    user-select: none;
    width: 15%;

    span.orderDirection {
        color: $primary-color;
        float: right;
    }
}
</style>
