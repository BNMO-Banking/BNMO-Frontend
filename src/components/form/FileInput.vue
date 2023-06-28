<script setup lang="ts">
defineProps(["inputId", "placeholder", "labelText", "class", "required", "inputValue"]);
</script>

<template>
    <div class="flex flex-col">
        <label :for="inputId">{{ labelText }}</label>
        <input
            @change="$emit('update:inputValue', $event.target.files[0])"
            :id="inputId"
            :placeholder="placeholder"
            type="file"
            accept="image/*"
            :class="class"
            :required="required"
        />
    </div>
</template>
