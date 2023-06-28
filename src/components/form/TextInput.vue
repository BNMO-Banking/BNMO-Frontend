<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
        default: ""
    },
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    extraStyle: {
        type: String,
        required: false,
        default: ""
    },
    required: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "update:modelValue", payload: string): void }>();
</script>

<template>
    <div class="flex flex-col w-full">
        <label :for="id">{{ label }}</label>
        <input
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :id="id"
            :placeholder="placeholder"
            :type="type"
            :class="extraStyle"
            :required="required"
            class="text-input"
        />
    </div>
</template>
