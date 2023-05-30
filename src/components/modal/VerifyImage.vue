<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
defineProps<{
    image_path: string;
}>();

defineEmits(["showModal"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex w-2/5 rounded-md bg-white items-center justify-center p-4"
            @click.stop
        >
            <img :src="image_path" />
        </div>
    </div>
</template>
