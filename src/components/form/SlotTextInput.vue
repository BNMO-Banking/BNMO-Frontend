<script setup lang="ts">
defineProps({
    modelValue: {
        type: [String, Number],
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
        <label v-if="label.length > 0" :for="id">{{ label }}</label>
        <div class="flex w-full items-center justify-center">
            <slot></slot>
            <input
                :value="modelValue"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :id="id"
                :placeholder="placeholder"
                :type="type"
                :class="extraStyle"
                :required="required"
                class="slot-text-input w-full"
            />
        </div>
    </div>
</template>
