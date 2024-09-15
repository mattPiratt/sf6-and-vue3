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

<style lang="scss" scoped>
@import '@/assets/_mixins.scss';

$button-border-color: darken($primary-color, 30%);
$button-border-color-hover: darken($primary-color, 30%);
$primary-color-dark: darken($primary-color, 15%);
$primary-color-light: lighten($primary-color, 60%);

button {
    @include button-styles($primary-color, $button-border-color, white);
    margin-right: 0.5rem;
    display: inline-block;
}

.outline {
    @include button-styles(transparent, $button-border-color, $primary-color-dark);

    &:hover,
    &:active {
        background-color: $primary-color-light;
    }
}

.medium {
    @include button-styles($primary-color-light, $button-border-color, $primary-color);
}
</style>
