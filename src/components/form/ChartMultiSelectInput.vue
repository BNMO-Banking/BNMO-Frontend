<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const emit = defineEmits<{ (event: "select-event", payload: Event): void }>();
</script>

<template>
    <div class="flex items-center justify-center h-full gap-x-2 lg:gap-x-4">
        <label v-if="label.length > 0" :for="id">{{ label }}</label>
        <select
            :id="id"
            class="multi-select-input h-full w-full cursor-pointer"
            @change="emit('select-event', $event)"
        >
            <slot></slot>
        </select>
    </div>
</template>
