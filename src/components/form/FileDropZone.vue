<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["files-dropped"]);

const onDrop = (event: DragEvent) => {
    setInactive();
    emit("files-dropped", event.dataTransfer!.files);
};

const preventDefaults = (event: Event) => {
    event.preventDefault();
};

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults);
    });
});

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults);
    });
});

const active = ref(false);
let activeTimeout: number;

const setActive = () => {
    active.value = true;
    clearTimeout(activeTimeout);
};

const setInactive = () => {
    activeTimeout = setTimeout(() => {
        active.value = false;
    }, 50);
};
</script>

<template>
    <div
        :data-active="active"
        @dragenter.prevent="setActive"
        @dragover.prevent="setActive"
        @dragleave.prevent="setInactive"
        @drop.prevent="onDrop"
    >
        <slot :dropZoneActive="active"></slot>
    </div>
</template>
