<script setup lang="ts">
import AddRequest from "../../components/request/AddRequest.vue";
import SubtractRequest from "../../components/request/SubtractRequest.vue";
import { useCurrencyStore } from "../../store/currency.store";
const currencyStore = useCurrencyStore();
currencyStore.getSymbols();
</script>

<template>
    <h1 class="text-center my-8">- Request -</h1>
    <main
        class="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 items-center justify-center mx-8 mb-8 lg:mx-32 gap-x-8 gap-y-4"
    >
        <AddRequest />
        <SubtractRequest />
    </main>
</template>
