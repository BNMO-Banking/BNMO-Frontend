<script setup lang="ts">
import { ref, watch } from "vue";
import RequestHistoryRow from "../../tablerow/RequestHistoryRow.vue";
import { useAccountStore } from "../../../store/account";
import axios from "axios";
import router from "../../../router/router";
import RequestHistory from "../../../types/request-history";

const accountStore = useAccountStore();

const emptyData = ref(false);
const page = ref(1);
const totalPage = ref(1);
const datas = ref<RequestHistory[]>();

const getRequestHistory = () => {
    axios
        .get(
            `http://localhost:8080/request-history?id=${accountStore.ID}&page=${page.value}`,
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
        getRequestHistory();
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
                <th scope="col" class="p-4 w-[15%] text-lg">Request Type</th>
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
            <RequestHistoryRow
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
        Request history empty. Start requesting
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
