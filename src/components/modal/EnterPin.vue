<script setup lang="ts">
import { ref } from "vue";
import TextInput from "../form/TextInput.vue";
import ModalBase from "./ModalBase.vue";

defineEmits(["close-modal", "pin"]);

const pin = ref("");
</script>

<template>
    <ModalBase
        box-style="flex flex-col justify-center border-2 border-main-blue p-4 lg:p-8 drop-shadow-xl w-4/5 lg:w-1/4 h-3/8 gap-y-4"
        @outside-click="$emit('close-modal')"
    >
        <h2 class="text-center">Enter PIN</h2>
        <TextInput
            v-model="pin"
            id="pin"
            label="PIN"
            placeholder="Enter PIN"
            type="password"
            required
        />
        <button class="normal-button bg-main-blue" @click="$emit('pin', pin)">Submit</button>
    </ModalBase>
</template>
