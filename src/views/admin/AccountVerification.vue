<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import router from "../../router/router";
import { useAccountVerificationStore } from "../../store/account-verification.store";
import { storeToRefs } from "pinia";
import SpinnerLoading from "../../components/form/SpinnerLoading.vue";
import ListHeader from "../../components/accountverification/ListHeader.vue";
import ListRow from "../../components/accountverification/ListRow.vue";

const page = ref<number>(1);
const width = ["xl:w-[2%]", "xl:w-[30%]", "xl:w-[30%]", "xl:w-[25%]", "xl:w-[13%]"];
const checkAll = ref(false);
const checkedAccount = ref<string[]>([]);

const store = useAccountVerificationStore();

const { pendingAccounts, pageMetadata, isLoadingPendingAccounts } = storeToRefs(store);

store.getPendingAccounts(page.value);

const singleCheck = (id: string) => {
    checkedAccount.value.push(id);
};

watch(page, () => {
    store.getPendingAccounts(page.value);
    router.push({ name: "Account Verification", query: { page: page.value } });
    checkAll.value = false;
});

watch(checkAll, () => {
    if (checkAll.value) {
        pendingAccounts.value.forEach((item) => {
            checkedAccount.value.push(item.id);
        });
    } else {
        checkedAccount.value = [];
    }
});

onMounted(() => {
    if (router.currentRoute.value.query.page && router.currentRoute.value.query.page !== null) {
        page.value = parseInt(router.currentRoute.value.query.page.toString());
    }
});
</script>

<template>
    <h1 class="text-center m-8">- Account Verification -</h1>
    <main class="flex flex-col flex-1 mx-8 lg:mx-16 my-8 gap-y-4">
        <div
            v-if="pendingAccounts && !isLoadingPendingAccounts"
            class="flex flex-col w-full gap-y-4"
        >
            <ListHeader :width="width" @checked="checkAll = !checkAll" />
            <ListRow
                v-for="account in pendingAccounts"
                :key="account.id"
                :data="account"
                :width="width"
                :checked="checkAll"
                @checked="singleCheck"
            />
        </div>
        <div class="flex w-full items-center justify-center">
            <SpinnerLoading size="w-16 h-16" :is-loading="isLoadingPendingAccounts" />
        </div>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase text-center"
            v-if="!pendingAccounts && !isLoadingPendingAccounts"
        >
            No request to verify
        </h3>
        <div
            class="flex justify-center items-center gap-x-8 lg:gap-x-16"
            v-if="pendingAccounts && pendingAccounts.length !== 0 && !isLoadingPendingAccounts"
        >
            <button
                class="normal-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                @click="page--"
                v-if="page - 1 > 0"
            >
                Prev Page
            </button>
            <button class="normal-button bg-main-red border-main-red" disabled v-else>
                Prev Page
            </button>
            <h4 class="text-center">{{ page }} / {{ pageMetadata.last_page }}</h4>
            <button
                class="normal-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                @click="page++"
                v-if="page + 1 <= pageMetadata.last_page"
            >
                Next Page
            </button>
            <button class="normal-button bg-main-red border-main-red" disabled v-else>
                Next Page
            </button>
        </div>
    </main>
</template>
