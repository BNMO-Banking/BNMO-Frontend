<script setup lang="ts">
import { ref, watch } from "vue";
// import AccountVerificationRow from "../../tablerow/AccountVerificationRow.vue";
import VerifyImage from "../../modal/VerifyImage.vue";
import { useAccountVerificationStore } from "../../../store/account-verification.store";
import { storeToRefs } from "pinia";

const page = ref(1);

const store = useAccountVerificationStore();

const { pendingAccounts, pageMetadata, isLoadingPendingAccounts, errorPendingAccounts } =
    storeToRefs(store);

store.getPendingAccounts(page.value);

// const validateAccount = (id: number, isAccepted: boolean) => {
//     const data = {
//         id: id,
//         validation: isAccepted ? "accepted" : "rejected"
//     };

//     store.postValidateAccount(data).then(() => {
//         store.getPendingAccounts(page.value);
//     });
// };

watch(
    page,
    () => {
        store.getPendingAccounts(page.value);
    },
    {
        immediate: true
    }
);

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
            <tbody v-if="pendingAccounts.length !== 0" class="text-center">
                <!-- <AccountVerificationRow
                    v-for="(data, index) in pendingAccounts"
                    :key="data.ID"
                    :data="data"
                    :index="index + 1 + (page - 1) * 5"
                    @open-modal="(flag: boolean) => (showModal = flag)"
                    @image-data="(imagePath: string) => (imageData = imagePath)"
                    @accept="(id: number) => validateAccount(id, true)"
                    @reject="(id: number) => validateAccount(id, false)"
                /> -->
            </tbody>
        </table>
        <div class="flex w-full items-center justify-center">
            <svg
                v-if="isLoadingPendingAccounts"
                aria-hidden="true"
                class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-main-green"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
            v-if="pendingAccounts.length === 0 && !isLoadingPendingAccounts"
        >
            No account to verify
        </h3>
        <h3
            class="flex text-3xl text-main-red font-extrabold items-center justify-center w-full uppercase"
            v-if="errorPendingAccounts"
        >
            {{ errorPendingAccounts }}
        </h3>
        <div class="flex justify-center items-center gap-x-16" v-if="pendingAccounts.length !== 0">
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
