<script setup lang="ts">
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/navbar/Footer.vue";
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />
        <RouterView :key="$route.path" />
    </div>
    <Footer />
</template>
