<script setup lang="ts">
import { ref, watch } from "vue";
import AccountVerificationRow from "../../tablerow/AccountVerificationRow.vue";
import VerifyImage from "../../modal/VerifyImage.vue";
import axios from "axios";
import router from "../../../router/router";
import RequestAccount from "../../../types/account-request";
import { useToast } from "vue-toastification";

const toast = useToast();

const datas = ref<RequestAccount[]>();
const page = ref(1);
const totalPage = ref(1);
const emptyData = ref(false);

const getPendingAccounts = () => {
    axios
        .get(
            `http://localhost:8080/admin/get-pending-account?page=${page.value}`,
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

const validateAccount = (id: number, isAccepted: boolean) => {
    const data = {
        id: id,
        validation: isAccepted ? "accepted" : "rejected",
    };

    axios
        .post("http://localhost:8080/admin/validate-account", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            getPendingAccounts();
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

watch(
    router.currentRoute,
    () => {
        getPendingAccounts();
    },
    {
        immediate: true,
    }
);

watch(datas, () => {});

const showModal = ref(false);
const imageData = ref("");
</script>

<template>
    <VerifyImage
        v-if="showModal"
        @show-modal="(flag: boolean) => showModal = flag"
        :image_path="imageData"
    />
    <main class="flex flex-col flex-1 w-full">
        <h1 class="text-6xl font-extrabold uppercase text-center m-8" v-once>
            - Account Verification -
        </h1>
        <table class="mx-8 mb-6">
            <thead class="border bg-main-green" v-once>
                <tr>
                    <th scope="col" class="p-4 w-[5%] text-lg">ID</th>
                    <th scope="col" class="p-4 w-[15%] text-lg">First Name</th>
                    <th scope="col" class="p-4 w-[15%] text-lg">Last Name</th>
                    <th scope="col" class="p-4 w-[20%] text-lg">Email</th>
                    <th scope="col" class="p-4 w-[15%] text-lg">Username</th>
                    <th scope="col" class="p-4 w-[10%] text-lg">Image</th>
                    <th scope="col" class="p-4 w-[20%] text-lg">Action</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <AccountVerificationRow
                    v-if="!emptyData"
                    v-for="(data, index) in datas"
                    :key="data.ID"
                    :data="data"
                    :index="index + 1 + (page - 1) * 5"
                    @open-modal="(flag: boolean) => (showModal = flag)"
                    @image-data="(imagePath: string) => (imageData = imagePath)"
                    @accept="(id: number) => validateAccount(id, true)"
                    @reject="(id: number) => validateAccount(id, false)"
                />
            </tbody>
        </table>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
            v-if="emptyData"
        >
            No account to verify
        </h3>
        <div
            class="flex justify-center items-center gap-x-16"
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
    </main>
</template>
