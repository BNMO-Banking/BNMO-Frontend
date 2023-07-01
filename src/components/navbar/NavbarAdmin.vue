<script setup lang="ts">
import router from "../../router/router";
const adminLinks = [
    { name: "Account Verification", link: "/admin/accountverification", query: { page: 1 } },
    { name: "Request Verification", link: "/admin/requestverification", query: { page: 1 } },
    { name: "Customer Data", link: "/admin/customerdata" }
];
</script>

<template>
    <ul class="flex gap-x-4">
        <li v-for="link in adminLinks" :key="link.link">
            <RouterLink
                :key="link.name"
                :to="link"
                :class="
                    link.name === router.currentRoute.value.name
                        ? `underline underline-offset-4`
                        : `hover:underline hover:underline-offset-4`
                "
                >{{ link.name }}</RouterLink
            >
        </li>
    </ul>
</template>
