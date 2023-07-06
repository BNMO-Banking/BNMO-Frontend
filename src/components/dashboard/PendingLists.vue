<script setup lang="ts">
import { ref } from "vue";
import { useAdminDashboardStore } from "../../store/admin-dashboard.store";
import { storeToRefs } from "pinia";
import SpinnerLoading from "../form/SpinnerLoading.vue";

const adminDashboardStore = useAdminDashboardStore();
const { pendingAccounts, pendingRequests, isLoadingPendings } = storeToRefs(adminDashboardStore);
adminDashboardStore.getPendingLists();

const accountMode = ref(true);
</script>

<template>
    <div class="flex w-2/5 h-full flex-col p-8 drop-shadow-xl border border-black gap-y-4">
        <div class="flex items-center justify-between border-b border-black">
            <div class="flex">
                <button
                    class="normal-button px-4 border-black"
                    :class="accountMode ? `border-l border-t border-r bg-main-green` : null"
                    @click="accountMode = true"
                >
                    Account
                </button>
                <button
                    class="normal-button px-4 border-black"
                    :class="accountMode ? null : `border-l border-t border-r bg-main-green`"
                    @click="accountMode = false"
                >
                    Request
                </button>
            </div>
            <div>
                <RouterLink
                    :to="
                        accountMode
                            ? { name: `Account Verification` }
                            : { name: `Request Verification` }
                    "
                    class="flex gap-x-2 cursor-pointer hover:scale-105"
                >
                    <p>Take a look</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                    </svg>
                </RouterLink>
            </div>
        </div>
        <div v-if="isLoadingPendings" class="flex flex-grow items-center justify-center">
            <SpinnerLoading :is-loading="isLoadingPendings" />
        </div>
        <div
            v-if="accountMode && !isLoadingPendings"
            class="flex flex-col gap-y-2 flex-grow overflow-auto"
        >
            <h4>You have {{ pendingAccounts.total }} new account(s) to verify</h4>
            <ul class="flex flex-col gap-y-2 w-full">
                <li
                    v-for="account in pendingAccounts.pending"
                    :key="account.created_at.toDateString"
                    class="p-2 border border-black"
                >
                    <b>{{ account.first_name }} {{ account.last_name }}</b> on
                    {{
                        new Date(account.created_at).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    }}
                </li>
            </ul>
        </div>
        <div
            v-else-if="!accountMode && !isLoadingPendings"
            class="flex flex-col gap-y-2 flex-grow overflow-auto"
        >
            <h4>You have {{ pendingRequests.total }} new request(s) to verify</h4>
            <ul class="flex flex-col gap-y-2 w-full">
                <li
                    v-for="request in pendingRequests.pending"
                    :key="request.created_at.toDateString"
                    class="p-2 border border-black"
                >
                    <b>{{ request.first_name }} {{ request.last_name }}</b> request
                    <b>{{ request.request_type }}</b> on
                    {{
                        new Date(request.created_at).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    }}
                </li>
            </ul>
        </div>
    </div>
</template>
