<script setup lang="ts">
import router from "../../router/router";
const customerLinks = [
    { name: "Profile", link: "/profile" },
    { name: "Transfer", link: "/transfer" },
    { name: "Request", link: "/request" }
];
</script>

<template>
    <ul class="flex gap-x-4">
        <li v-for="link in customerLinks" :key="link.link">
            <RouterLink
                :key="link.link"
                :to="link.link"
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
