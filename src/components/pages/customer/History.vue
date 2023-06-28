<script setup lang="ts">
import RequestHistory from "./RequestHistory.vue";
import TransferHistory from "./TransferHistory.vue";
import { ref } from "vue";

const currentHistory = ref("request");
</script>

<template>
    <main class="flex flex-col flex-1 w-full">
        <h1 class="text-6xl font-extrabold uppercase text-center mt-8 mb-4">- History -</h1>
        <div class="flex items-center justify-center gap-x-8 text-2xl p-4">
            <button
                v-if="currentHistory == `transfer`"
                @click="currentHistory = `request`"
                class="hover:underline hover:underline-offset-4 hover:scale-110"
            >
                Request
            </button>
            <p
                v-else-if="currentHistory == `request`"
                class="underline underline-offset-4 scale-110"
            >
                Request
            </p>
            <button
                v-if="currentHistory == `request`"
                @click="currentHistory = `transfer`"
                class="hover:underline hover:underline-offset-4 hover:scale-110"
            >
                Transfer
            </button>
            <p
                v-else-if="currentHistory == `transfer`"
                class="underline underline-offset-4 scale-110"
            >
                Transfer
            </p>
        </div>
        <RequestHistory v-if="currentHistory == `request`" />
        <TransferHistory v-else-if="currentHistory == `transfer`" />
    </main>
</template>
