<script setup lang="ts">
import axios from "axios";
import { watch, ref, onMounted, onUnmounted } from "vue";
import RequestHistory from "../../types/request-history";
import TransferHistory from "../../types/transfer-history";
import RequestHistoryRow from "../tablerow/RequestHistoryRow.vue";
import TransferHistoryRow from "../tablerow/TransferHistoryRow.vue";

const props = defineProps<{
    id: number;
    type: string;
}>();

defineEmits(["showModal"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});

const page = ref(1);
const totalPage = ref(1);
const emptyData = ref(false);

const requestsDatas = ref<RequestHistory[]>();
const transfersDatas = ref<TransferHistory[]>();

const getRequestHistory = () => {
    axios
        .get(`http://localhost:8080/request-history?id=${props.id}&page=${page.value}`, {
            withCredentials: true
        })
        .then((response) => {
            requestsDatas.value = response.data.data;
            totalPage.value = response.data.metadata.last_page;
            if (response.data.metadata.total === 0) {
                emptyData.value = true;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const getTransferHistory = () => {
    axios
        .get(`http://localhost:8080/transfer-history?id=${props.id}&page=${page.value}`, {
            withCredentials: true
        })
        .then((response) => {
            console.log(response.data);
            transfersDatas.value = response.data.data;
            totalPage.value = response.data.metadata.last_page;
            if (response.data.metadata.total === 0) {
                emptyData.value = true;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

watch(
    props,
    () => {
        if (props.type === "request") {
            getRequestHistory();
        } else if (props.type === "transfer") {
            getTransferHistory();
        }
    },
    {
        immediate: true
    }
);
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex flex-col rounded-md bg-white items-center gap-y-4 justify-center p-8"
            @click.stop
        >
            <h4 class="text-3xl font-bold uppercase text-center" v-once>
                {{ type === "request" ? "User request history" : "User transfer history" }}
            </h4>
            <table v-if="type === `request`" class="mx-8 my-6">
                <thead class="border bg-main-green" v-once>
                    <tr>
                        <th scope="col" class="p-4 w-[5%] text-lg">ID</th>
                        <th scope="col" class="p-4 w-[15%] text-lg">Request Type</th>
                        <th scope="col" class="p-4 w-[10%] text-lg">Currency</th>
                        <th scope="col" class="p-4 w-[15%] text-lg">Amount</th>
                        <th scope="col" class="p-4 w-[20%] text-lg">Converted Amount</th>
                        <th scope="col" class="p-4 w-[10%] text-lg">Status</th>
                        <th scope="col" class="p-4 w-[25%] text-lg">Timestamp</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <RequestHistoryRow
                        v-for="(data, index) in requestsDatas"
                        :key="data.ID"
                        :data="data"
                        :index="index + 1 + (page - 1) * 5"
                    />
                </tbody>
            </table>
            <h3
                class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
                v-if="emptyData && type === `request`"
            >
                Request history empty
            </h3>
            <div
                class="flex justify-center items-center gap-x-16 mb-4"
                v-if="!emptyData && type === `request`"
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
                    {{ page }} / {{ totalPage }}
                </h4>
                <button
                    class="navbar-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                    @click="page++"
                    v-if="page + 1 <= totalPage"
                >
                    Next Page
                </button>
                <button class="navbar-button bg-main-red border-main-red" disabled v-else>
                    Next Page
                </button>
            </div>

            <table v-else-if="type === `transfer`" class="mx-8 my-6">
                <thead class="border bg-main-green" v-once>
                    <tr>
                        <th scope="col" class="p-4 w-[5%] text-lg">ID</th>
                        <th scope="col" class="p-4 w-[15%] text-lg">Destination</th>
                        <th scope="col" class="p-4 w-[10%] text-lg">Currency</th>
                        <th scope="col" class="p-4 w-[15%] text-lg">Amount</th>
                        <th scope="col" class="p-4 w-[20%] text-lg">Converted Amount</th>
                        <th scope="col" class="p-4 w-[10%] text-lg">Status</th>
                        <th scope="col" class="p-4 w-[25%] text-lg">Timestamp</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <TransferHistoryRow
                        v-for="(data, index) in transfersDatas"
                        :key="data.ID"
                        :data="data"
                        :index="index + 1 + (page - 1) * 5"
                    />
                </tbody>
            </table>
            <h3
                class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
                v-if="emptyData && type === `transfer`"
            >
                Transfer history empty
            </h3>
            <div
                class="flex justify-center items-center gap-x-16 mb-4"
                v-if="!emptyData && type === `transfer`"
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
                    {{ page }} / {{ totalPage }}
                </h4>
                <button
                    class="navbar-button bg-main-green border-main-green hover:scale-105 hover:text-white"
                    @click="page++"
                    v-if="page + 1 <= totalPage"
                >
                    Next Page
                </button>
                <button class="navbar-button bg-main-red border-main-red" disabled v-else>
                    Next Page
                </button>
            </div>
        </div>
    </div>
</template>
