<script setup lang="ts">
defineProps({
    width: {
        type: Array<string>,
        required: true
    }
});

defineEmits(["checked"]);
</script>

<template>
    <div class="w-full flex items-center text-center px-4">
        <input :class="width[0]" class="w-4 h-4" type="checkbox" @change="$emit('checked')" />
        <h4 :class="width[1]">Type</h4>
        <h4 :class="width[2]">Details</h4>
        <h4 :class="width[3]">Conversion & Status</h4>
        <h4 :class="width[4]">Action</h4>
    </div>
</template>
