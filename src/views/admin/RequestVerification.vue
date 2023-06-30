<script setup lang="ts">
import { ref, watch } from "vue";
// import RequestVerificationRow from "../../tablerow/RequestVerificationRow.vue";
import { useRequestVerificationStore } from "../../store/request-verification.store";
import { storeToRefs } from "pinia";
import SpinnerLoading from "../../components/form/SpinnerLoading.vue";
import ListRow from "../../components/requestverification/ListRow.vue";
import ListHeader from "../../components/requestverification/ListHeader.vue";

const page = ref(1);
const width = ["w-[2%]", "w-[13%]", "w-[35%]", "w-[37.5%]", "w-[12.5%]"];

const store = useRequestVerificationStore();

const { pendingRequests, pageMetadata, isLoadingPendingRequests } = storeToRefs(store);

store.getPendingRequests(page.value);

// const validateRequest = (id: number, isAccepted: boolean) => {
//     const data = {
//         request_id: id,
//         status: isAccepted ? "accepted" : "rejected"
//     };

//     store.postValidateRequest(data).then(() => {
//         store.getPendingRequests(page.value);
//     });
// };

watch(page, () => {
    store.getPendingRequests(page.value);
});
</script>

<template>
    <h1 class="text-center m-8">- Request Verification -</h1>
    <main class="flex flex-col flex-1 mx-16 my-8 gap-y-4">
        <div v-if="!isLoadingPendingRequests" class="flex flex-col w-full gap-y-4">
            <ListHeader :width="width" />
            <ListRow
                v-for="request in pendingRequests"
                :key="request.id"
                :data="request"
                :width="width"
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
        <div class="flex justify-center items-center gap-x-16" v-if="pendingRequests.length !== 0">
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
