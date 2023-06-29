<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["upload-file"]);
const active = ref(false);

const toggleActive = () => {
    active.value = !active.value;
};

const dropFile = (event: DragEvent) => {
    active.value = !active.value;
    emit("upload-file", (event.dataTransfer as DataTransfer).files[0]);
};

const selectFile = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
        return;
    }
    emit("upload-file", input.files[0]);
};
</script>

<template>
    <div
        @dragenter.prevent="toggleActive"
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="dropFile"
        :class="active ? `bg-main-green/20 scale-105` : null"
        class="drop-zone gap-y-2"
    >
        <div class="flex flex-col items-center justify-center gap-y-2">
            <svg
                v-if="!active"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 hidden lg:block"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12 hidden lg:block"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
            </svg>
            <p v-if="!active" class="hidden lg:block">Drag and drop your file</p>
            <p v-else class="hidden lg:block">Drop your file</p>
        </div>
        <p class="hidden lg:block">-------------------- or --------------------</p>
        <label
            for="drop-zone-file"
            class="normal-button bg-main-green w-1/2 lg:w-1/4 cursor-pointer"
            >Browse file</label
        >
        <input
            type="file"
            id="drop-zone-file"
            class="hidden"
            @change="selectFile"
            accept="image/*"
        />
    </div>
</template>
