<script setup lang="ts">
import { ref, watch } from "vue";
import TransferHistoryRow from "../../tablerow/TransferHistoryRow.vue";
import { useAccountStore } from "../../../store/account";
import axios from "axios";
import router from "../../../router/router";
import TransferHistory from "../../../types/transfer-history";

const accountStore = useAccountStore();

const emptyData = ref(false);
const page = ref(1);
const totalPage = ref(1);
const datas = ref<TransferHistory[]>();

const getTransferHistory = () => {
    axios
        .get(
            `http://localhost:8080/transfer-history?id=${accountStore.ID}&page=${page.value}`,
            {
                withCredentials: true,
            }
        )
        .then((response) => {
            datas.value = response.data.data;
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
    [router.currentRoute, page],
    () => {
        getTransferHistory();
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <table class="mx-8 my-6">
        <thead class="border bg-main-green" v-once>
            <tr>
                <th scope="col" class="p-4 w-[5%] text-lg">ID</th>
                <th scope="col" class="p-4 w-[15%] text-lg">Destination</th>
                <th scope="col" class="p-4 w-[10%] text-lg">Currency</th>
                <th scope="col" class="p-4 w-[15%] text-lg">Amount</th>
                <th scope="col" class="p-4 w-[20%] text-lg">
                    Converted Amount
                </th>
                <th scope="col" class="p-4 w-[10%] text-lg">Status</th>
                <th scope="col" class="p-4 w-[25%] text-lg">Timestamp</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <TransferHistoryRow
                v-for="(data, index) in datas"
                :key="data.ID"
                :data="data"
                :index="index + 1 + (page - 1) * 5"
            />
        </tbody>
    </table>
    <h3
        class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
        v-if="emptyData"
    >
        Transfer history empty. Start transferring
    </h3>
    <div
        class="flex justify-center items-center gap-x-16 mb-4"
        v-if="!emptyData"
    >
        <button
            class="navbar-button bg-main-green border-main-green hover:scale-105 hover:text-white"
            @click="page--"
            v-if="page - 1 > 0"
        >
            Prev Page
        </button>
        <button
            class="navbar-button bg-main-red border-main-red"
            disabled
            v-else
        >
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
        <button
            class="navbar-button bg-main-red border-main-red"
            disabled
            v-else
        >
            Next Page
        </button>
    </div>
</template>
