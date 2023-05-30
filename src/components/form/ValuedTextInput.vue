<script setup lang="ts">
defineEmits(["update:inputValue"]);
defineProps([
    "inputId",
    "placeholder",
    "labelText",
    "inputType",
    "class",
    "required",
    "inputValue",
    "optionalValue",
]);
</script>

<template>
    <div class="flex flex-col w-full">
        <label :for="inputId">{{ labelText }}</label>
        <input
            :value="optionalValue"
            @input="$emit('update:inputValue', $event.target.value)"
            :id="inputId"
            :placeholder="placeholder"
            :type="inputType"
            :class="class"
            :required="required"
        />
    </div>
</template>
