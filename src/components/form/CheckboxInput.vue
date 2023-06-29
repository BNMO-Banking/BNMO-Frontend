<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true
    },
    required: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "checked", payload: Event): void }>();
</script>

<template>
    <div class="flex w-full items-center gap-x-4">
        <input
            class="w-4 h-4"
            type="checkbox"
            :id="id"
            :required="required"
            @change="emit('checked', $event)"
        />
        <label :for="id"><slot></slot></label>
    </div>
</template>
