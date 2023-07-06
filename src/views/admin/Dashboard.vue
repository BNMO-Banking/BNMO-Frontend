<script setup lang="ts">
import { useAdminDashboardStore } from "../../store/admin-dashboard.store";
import { storeToRefs } from "pinia";
import BankStatistics from "../../components/dashboard/BankStatistics.vue";
import PendingList from "../../components/dashboard/PendingLists.vue";

const adminDashboardStore = useAdminDashboardStore();
const {
    accountStatistics,
    isLoadingAccountStatistics,
    addRequests,
    subtractRequests,
    isLoadingRequestStatistics
} = storeToRefs(adminDashboardStore);
</script>

<template>
    <main class="flex flex-col m-16 gap-y-4">
        <div class="flex flex-col">
            <h1>Hello Admin</h1>
            <h2>Welcome back</h2>
        </div>
        <div class="flex items-center gap-x-4 h-96">
            <BankStatistics />
            <PendingList />
        </div>
    </main>
    <div>Dashboard</div>
</template>
