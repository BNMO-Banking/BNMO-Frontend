<script setup lang="ts">
import router from "../../router/router";
const customerLinks = [
    {
        route: { name: "Profile", link: "/profile" },
        svg: "/profile.svg"
    },
    {
        route: { name: "Transfer", link: "/transfer" },
        svg: "/transfer.svg"
    },
    {
        route: { name: "Request", link: "/request" },
        svg: "/request.svg"
    }
];

defineEmits(["change-route"]);
</script>

<template>
    <ul class="flex flex-col gap-y-2">
        <li
            class="flex gap-x-2 items-center px-4 py-2"
            v-for="link in customerLinks"
            :key="link.route.link"
            :class="link.route.name === router.currentRoute.value.name ? `bg-main-green` : null"
            @click="$emit('change-route')"
        >
            <img :src="link.svg" class="w-6 h-6" />
            <RouterLink :key="link.route.name" :to="link.route">{{ link.route.name }}</RouterLink>
        </li>
    </ul>
</template>
