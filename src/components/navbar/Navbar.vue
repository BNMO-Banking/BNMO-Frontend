<script setup lang="ts">
import { ref, watch } from "vue";
import NavbarAdmin from "./NavbarAdmin.vue";
import NavbarCustomer from "./NavbarCustomer.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import router from "../../router/router";
import { useAccountStore } from "../../store/account";
import { useSymbolsStore } from "../../store/symbols";

const toast = useToast();

const isLoggedIn = ref(false);
const isAdmin = ref(false);

const accountStore = useAccountStore();
const symbolStore = useSymbolsStore();

watch(
    () => [accountStore.is_admin, accountStore.ID],
    () => {
        if (accountStore.ID !== 0) {
            isLoggedIn.value = true;
            if (accountStore.is_admin) {
                isAdmin.value = true;
            } else {
                isAdmin.value = false;
            }
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

const logout = () => {
    axios
        .post("http://localhost:8080/logout", null, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            localStorage.removeItem("account");
            accountStore.$reset();
            symbolStore.$reset();
            isLoggedIn.value = false;
            router.push("/");
        })
        .catch(() => {
            toast.error("Internal server error: Failed to log out", {
                timeout: 5000,
            });
        });
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
