<script setup lang="ts">
import router from "../../router/router";
const adminLinks = [
    {
        route: { name: "Dashboard", link: "/admin/dashboard" },
        svg: "../src/assets/icons/dashboard.svg"
    },
    {
        route: {
            name: "Account Verification",
            link: "/admin/accountverification",
            query: { page: 1 }
        },
        svg: "../src/assets/icons/accountverif.svg"
    },
    {
        route: {
            name: "Request Verification",
            link: "/admin/requestverification",
            query: { page: 1 }
        },
        svg: "../src/assets/icons/requestverif.svg"
    },
    {
        route: { name: "Customer Data", link: "/admin/customerdata" },
        svg: "../src/assets/icons/customerdata.svg"
    }
];

defineEmits(["change-route"]);
</script>

<template>
    <ul class="flex flex-col gap-y-2">
        <li
            class="flex gap-x-2 items-center px-4 py-2"
            v-for="link in adminLinks"
            :key="link.route.link"
            :class="link.route.name === router.currentRoute.value.name ? `bg-main-green` : null"
            @click="$emit('change-route')"
        >
            <img :src="link.svg" class="w-6 h-6" />
            <RouterLink :key="link.route.name" :to="link.route">{{ link.route.name }}</RouterLink>
        </li>
    </ul>
</template>
