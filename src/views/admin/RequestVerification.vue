<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import router from "../../router/router";
import { useRequestVerificationStore } from "../../store/request-verification.store";
import { storeToRefs } from "pinia";
import SpinnerLoading from "../../components/form/SpinnerLoading.vue";
import ListRow from "../../components/requestverification/ListRow.vue";
import ListHeader from "../../components/requestverification/ListHeader.vue";
// import { Status } from "../../enum/status.enum";

const page = ref<number>(1);
const width = ["w-[2%]", "w-[13%]", "w-[35%]", "w-[37.5%]", "w-[12.5%]"];
const checkAll = ref(false);
const checkedRequest = ref<string[]>([]);

const store = useRequestVerificationStore();

const { pendingRequests, pageMetadata, isLoadingPendingRequests } = storeToRefs(store);

store.getPendingRequests(page.value);

const singleCheck = (id: string) => {
    checkedRequest.value.push(id);
};

// const validateRequest = (id: string, isAccepted: boolean, remarks: string | null) => {
//     store.postValidateRequest(id, isAccepted ? Status.ACCEPTED : Status.REJECTED, remarks);
// };

watch(page, () => {
    store.getPendingRequests(page.value);
    router.push({ name: "Request Verification", query: { page: page.value } });
    checkAll.value = false;
});

watch(checkAll, () => {
    if (checkAll.value) {
        pendingRequests.value.forEach((item) => {
            checkedRequest.value.push(item.id);
        });
    } else {
        checkedRequest.value = [];
    }
});

onMounted(() => {
    if (router.currentRoute.value.query.page !== null) {
        page.value = parseInt(router.currentRoute.value.query.page.toString());
    }
});
</script>

<template>
    <h1 class="text-center m-8">- Request Verification -</h1>
    <main class="flex flex-col flex-1 mx-16 my-8 gap-y-4">
        <div v-if="!isLoadingPendingRequests" class="flex flex-col w-full gap-y-4">
            <ListHeader :width="width" @checked="checkAll = !checkAll" />
            <ListRow
                v-for="request in pendingRequests"
                :key="request.id"
                :data="request"
                :width="width"
                :checked="checkAll"
                @checked="singleCheck"
            />
        </div>
        <div class="flex w-full items-center justify-center">
            <SpinnerLoading size="w-16 h-16" :is-loading="isLoadingPendingRequests" />
        </div>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
            v-if="pendingRequests.length === 0 && !isLoadingPendingRequests"
        >
            No request to verify
        </h3>
        <div
            class="flex justify-center items-center gap-x-16"
            v-if="pendingRequests.length !== 0 && !isLoadingPendingRequests"
        >
            <button
                class="navbar-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                @click="page--"
                v-if="page - 1 > 0"
            >
                Prev Page
            </button>
            <button class="navbar-button bg-main-red border-main-red" disabled v-else>
                Prev Page
            </button>
            <h4 class="text-xl font-extrabold uppercase text-center">
                {{ page }} / {{ pageMetadata.last_page }}
            </h4>
            <button
                class="navbar-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                @click="page++"
                v-if="page + 1 <= pageMetadata.last_page"
            >
                Next Page
            </button>
            <button class="navbar-button bg-main-red border-main-red" disabled v-else>
                Next Page
            </button>
        </div>
    </main>
</template>
