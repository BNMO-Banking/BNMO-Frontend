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
    isSlot: {
        type: Boolean
    },
    isLoading: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "select-event", payload: Event): void }>();
</script>

<template>
    <div class="flex flex-col h-full">
        <label v-if="label.length > 0" :for="id">{{ label }}</label>
        <SpinnerLoading :is-loading="isLoading" />
        <select
            v-if="!isLoading"
            :id="id"
            :class="
                isSlot
                    ? `slot-input-left-side h-full cursor-pointer`
                    : `multi-select-input h-full cursor-pointer`
            "
            @change="emit('select-event', $event)"
            :required="required"
        >
            <slot></slot>
        </select>
    </div>
</template>
