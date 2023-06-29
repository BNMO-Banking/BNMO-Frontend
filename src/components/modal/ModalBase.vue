<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
defineProps({
    boxStyle: {
        type: String,
        required: false,
        default: ""
    }
});

defineEmits(["outside-click"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});
</script>

<template>
    <div class="modal-base" @click="$emit('outside-click')">
        <div class="modal-box" :class="boxStyle" @click.stop><slot></slot></div>
    </div>
</template>
