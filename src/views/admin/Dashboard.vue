<script setup lang="ts">
import BankStatistics from "../../components/dashboard/BankStatistics.vue";
import PendingList from "../../components/dashboard/PendingLists.vue";
import AccountStatistics from "../../components/dashboard/AccountStatistics.vue";
import RequestStatistics from "../../components/dashboard/RequestStatistics.vue";
</script>

<template>
    <main class="flex flex-col m-4 xl:m-16 gap-y-4">
        <div class="flex flex-col">
            <h1>Hello Admin</h1>
            <h2>Welcome back</h2>
        </div>
        <div class="flex flex-col xl:flex-row items-center gap-x-4 gap-y-4 xl:gap-y-0 xl:h-96">
            <BankStatistics />
            <PendingList />
        </div>
        <div class="flex flex-col xl:flex-row items-center gap-x-4 gap-y-4 xl:gap-y-0 xl:h-[26rem]">
            <RequestStatistics />
            <AccountStatistics />
        </div>
    </main>
</template>
