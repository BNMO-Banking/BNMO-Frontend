<script setup lang="ts">
import { ref } from "vue";
import AddDestination from "../../components/transfer/AddDestination.vue";
import TransferComponent from "../../components/transfer/TransferComponent.vue";
import TermsConditions from "../../components/modal/TermsConditions.vue";
import { useCurrencyStore } from "../../store/currency.store";
const currencyStore = useCurrencyStore();
currencyStore.getSymbols();

const tc = ref(false);
</script>

<template>
    <h1 class="text-center my-8 lg:my-12">- Transfer -</h1>
    <main
        class="grid grid-rows-auto-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 items-center justify-center mx-8 mb-8 lg:mx-32 lg:mt-16 gap-x-8 gap-y-4"
    >
        <AddDestination @tc_clicked="(flag: boolean) => tc = flag" />
        <TransferComponent @tc_clicked="(flag: boolean) => tc = flag" />
        <TermsConditions v-if="tc" @close-modal="tc = false" />
    </main>
</template>
