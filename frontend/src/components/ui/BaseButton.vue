<script>
export default {
    props: {
        styleMode: {
            type: String,
            required: false,
            default: null,
        },
        to: {
            type: Object,
            required: false,
            default: () => {
            },
        },
    },
};
</script>

<template>
    <button :class="styleMode">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font: inherit;
    background-color: #6501a1;
    border: 1px solid #3a0061;
    color: white;
    cursor: pointer;
    border-radius: 30px;
    margin-right: 0.5rem;
    display: inline-block;
}

button:hover,
button:active {
    background-color: #270041;
    border-color: #270041;
}

.outline {
    background-color: transparent;
    border-color: #270041;
    color: #270041;
}

.outline:hover,
.outline:active {
    background-color: #edd2ff;
}
</style>
