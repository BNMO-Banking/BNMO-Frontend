<script setup lang="ts">
import { ref } from "vue";
import AddRequest from "../../components/request/AddRequest.vue";
import SubtractRequest from "../../components/request/SubtractRequest.vue";
import TermsConditions from "../../components/modal/TermsConditions.vue";
import { useCurrencyStore } from "../../store/currency.store";
const currencyStore = useCurrencyStore();
currencyStore.getSymbols();

const tc = ref(false);
</script>

<template>
    <h1 class="text-center my-8 lg:my-12">- Request -</h1>
    <main
        class="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 items-center justify-center mx-8 mb-8 lg:mx-32 lg:mt-16 gap-x-8 gap-y-4"
    >
        <AddRequest @tc_clicked="(flag: boolean) => tc = flag" />
        <SubtractRequest @tc_clicked="(flag: boolean) => tc = flag" />
        <TermsConditions v-if="tc" @close-modal="tc = false" />
    </main>
</template>
