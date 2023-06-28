<script setup lang="ts">
import { ref, watch } from "vue";
import VerifyImage from "../../modal/VerifyImage.vue";
// import EditData from "../../modal/EditData.vue";
import axios from "axios";
import router from "../../../router/router";
import CustomerData from "../../../types/customer-data";
import CustomerDataRow from "../../tablerow/CustomerDataRow.vue";
import UserHistory from "../../modal/UserHistory.vue";
import Confirmation from "../../modal/Confirmation.vue";

const datas = ref<CustomerData[]>();
const emptyData = ref(false);

const getCustomerData = () => {
    axios
        .get("http://localhost:8080/admin/get-customer-data", {
            withCredentials: true
        })
        .then((response) => {
            datas.value = response.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

watch(
    router.currentRoute,
    () => {
        getCustomerData();
    },
    {
        immediate: true
    }
);

// watch(datas, () => {});

// Refs and watch for opening details
const openedId = ref([] as number[]);

// Refs for viewing image
const showImageModal = ref(false);
const imageData = ref("");

// Refs for editing data
const showEditData = ref(false);
const editData = ref<CustomerData>();
watch(showEditData, (newFlag) => {
    if (!newFlag) {
        getCustomerData();
    }
});

const selectedEditData = (emit: any) => {
    showEditData.value = emit.flag;
    editData.value = emit.data;
};

// Refs for history
const showHistoryData = ref(false);
const userId = ref(0);
const historyType = ref("");

const openHistory = (emit: any) => {
    showHistoryData.value = emit.flag;
    userId.value = emit.id;
    historyType.value = emit.type;
};

// Refs for reset pin and delete data
const resetPin = ref(false);
const resetId = ref(0);
const deleteData = ref(false);
const deleteId = ref(0);

const confirmReset = (emit: any) => {
    resetPin.value = emit.flag;
    resetId.value = emit.id;
};

const confirmDelete = (emit: any) => {
    deleteData.value = emit.flag;
    deleteId.value = emit.id;
};

watch(deleteData, (newFlag) => {
    if (!newFlag) {
        getCustomerData();
    }
});
</script>

<template>
    <VerifyImage
        v-if="showImageModal"
        @show-modal="(flag: boolean) => showImageModal = flag"
        :image_path="imageData"
    />
    <!-- <EditData v-if="showEditData" @show-modal="(flag: boolean) => showEditData = flag" /> -->
    <UserHistory
        v-if="showHistoryData"
        @show-modal="(flag: boolean) => showHistoryData = flag"
        :id="userId"
        :type="historyType"
    />
    <Confirmation
        v-if="resetPin"
        @show-modal="(flag: boolean) => resetPin = flag"
        :id="resetId"
        :type="`reset`"
    />
    <Confirmation
        v-if="deleteData"
        @show-modal="(flag: boolean) => deleteData = flag"
        :id="deleteId"
        :type="`delete`"
    />
    <main class="flex flex-col flex-1 w-full">
        <h1 class="text-6xl font-extrabold uppercase text-center m-8" v-once>- Customer Data -</h1>
        <table class="mx-8 mb-6">
            <thead class="border bg-main-green" v-once>
                <tr>
                    <th scope="col" class="p-4 w-[10%] text-lg">ID</th>
                    <th scope="col" class="p-4 w-[15%] text-lg">First Name</th>
                    <th scope="col" class="p-4 w-[15%] text-lg">Last Name</th>
                    <th scope="col" class="p-4 w-[20%] text-lg">Email</th>
                    <th scope="col" class="p-4 w-[30%] text-lg">Register Time</th>
                    <th scope="col" class="p-4 w-[10%] text-lg">Action</th>
                </tr>
            </thead>
            <tbody v-if="!emptyData" class="text-center">
                <CustomerDataRow
                    v-for="(data, index) in datas"
                    :key="data.ID"
                    :data="data"
                    :index="index + 1"
                    :opened-id="openedId"
                    @open-image-modal="(flag: boolean) => showImageModal = flag"
                    @image-data="(imagePath: string) => (imageData = imagePath)"
                    @open-details="(id: number) => {
                        openedId.length === 1 ? 
                            openedId.includes(id) ? openedId.pop() : (openedId.pop(), openedId.push(id)) 
                        : openedId.push(id)
                    }"
                    @edit-data="selectedEditData"
                    @open-history="openHistory"
                    @open-reset="confirmReset"
                    @open-delete="confirmDelete"
                />
            </tbody>
        </table>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
            v-if="emptyData"
        >
            No account to verify
        </h3>
    </main>
</template>
