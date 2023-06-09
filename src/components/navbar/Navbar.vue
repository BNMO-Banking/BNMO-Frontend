<script setup lang="ts">
import { ref, watch } from "vue";
import NavbarAdmin from "./NavbarAdmin.vue";
import NavbarCustomer from "./NavbarCustomer.vue";
import router from "../../router/router";
import { useAuthStore } from "../../store/auth.store";

const isLoggedIn = ref(false);
const isAdmin = ref(false);

const authStore = useAuthStore();

watch(
    authStore,
    () => {
        if (authStore.account.ID) {
            isLoggedIn.value = true;
            if (authStore.account.is_admin) {
                isAdmin.value = true;
            } else {
                isAdmin.value = false;
            }
        } else {
            isLoggedIn.value = false;
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

const logout = () => {
    authStore.postLogout()
};
</script>

<template>
    <nav
        class="sticky top-0 flex z-[1] bg-white justify-between items-center py-2 px-4 gap-x-4 shadow-md"
    >
        <RouterLink to="/">
            <img src="/Logo.png" alt="Logo" class="w-32" v-once />
        </RouterLink>
        <div class="flex items-center" v-if="isLoggedIn">
            <NavbarAdmin v-if="isAdmin" />
            <NavbarCustomer v-else />
        </div>
        <RouterLink
            v-if="!isLoggedIn"
            class="navbar-button hover:bg-main-green hover:border-main-green"
            to="/login"
        >
            Login
        </RouterLink>
        <RouterLink
            v-else-if="
                isLoggedIn &&
                !isAdmin &&
                router.currentRoute.value.name !== `Profile`
            "
            class="navbar-button hover:bg-main-green hover:border-main-green"
            to="/profile"
        >
            Profile
        </RouterLink>
        <RouterLink
            v-else
            class="navbar-button hover:bg-main-red hover:border-main-red"
            to="/"
            @click="logout"
        >
            Logout
        </RouterLink>
    </nav>
</template>
