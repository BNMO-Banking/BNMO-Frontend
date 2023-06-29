<script setup lang="ts">
import SpinnerLoading from "../form/SpinnerLoading.vue";
defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    required: {
        type: Boolean
    },
    isLoading: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "select-event", payload: Event): void }>();
</script>

<template>
    <div class="flex flex-col">
        <label :for="id">{{ label }}</label>
        <SpinnerLoading :is-loading="isLoading" />
        <select
            v-if="!isLoading"
            :id="id"
            class="multi-select-input h-full cursor-pointer"
            :onchange="(event: Event) => emit('select-event', event)"
            :required="required"
        >
            <slot></slot>
        </select>
    </div>
</template>
