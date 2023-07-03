<script setup lang="ts">
import { ref, watch } from "vue";
import NavbarAdmin from "./NavbarAdmin.vue";
import NavbarCustomer from "./NavbarCustomer.vue";
import { useAuthStore } from "../../store/auth.store";
import { storeToRefs } from "pinia";
import { AccountType } from "../../enum/acctype.enum";
import NavbarMobileAdmin from "./NavbarMobileAdmin.vue";
import NavbarMobileCustomer from "./NavbarMobileCustomer.vue";

const isLoggedIn = ref(false);
const isAdmin = ref(false);
const burger = ref(false);

const authStore = useAuthStore();
const { getAccount } = storeToRefs(authStore);

watch(
    getAccount,
    () => {
        if (getAccount.value.id) {
            isLoggedIn.value = true;
            if (getAccount.value.account_type === AccountType.ADMIN) {
                isAdmin.value = true;
            } else {
                isAdmin.value = false;
            }
        } else {
            isLoggedIn.value = false;
        }
    },
    {
        immediate: true
    }
);

const logout = () => {
    authStore.postLogout();
    isLoggedIn.value = false;
};
</script>

<template>
    <nav class="sticky top-0 z-[5]">
        <div
            class="sticky top-0 flex items-center justify-between bg-white py-2 px-4 gap-x-4 shadow-md"
        >
            <div class="flex items-center gap-x-4">
                <svg
                    v-if="isLoggedIn"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 block lg:hidden"
                    @click="burger = !burger"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <RouterLink to="/">
                    <img src="/Logo.png" alt="Logo" class="w-32" v-once />
                </RouterLink>
            </div>
            <div class="hidden lg:flex items-center" v-if="isLoggedIn && !burger">
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
                v-else
                class="navbar-button hover:bg-main-red hover:border-main-red"
                to="/"
                @click="logout"
            >
                Logout
            </RouterLink>
        </div>
        <div v-if="burger" class="flex flex-col fixed h-screen w-3/5 bg-white">
            <NavbarMobileAdmin v-if="isAdmin" />
            <NavbarMobileCustomer v-else />
        </div>
    </nav>
</template>
