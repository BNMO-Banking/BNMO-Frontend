<script setup lang="ts">
import TextInput from "../form/TextInput.vue";
import Account from "../../types/account-type";
import { ref } from "vue";
import axios from "axios";
import router from "../../router/router";
import { useToast } from "vue-toastification";
import { useAccountStore } from "../../store/account";
import { useSymbolsStore } from "../../store/symbols";

const toast = useToast();

const email = ref("");
const password = ref("");

const login = (event: Event) => {
    event.preventDefault();
    const data = {
        email: email.value,
        password: password.value,
    };

    axios
        .post("http://localhost:8080/login", data)
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            let account: Account = response.data.account;

            // Update store data
            const store = useAccountStore();
            store.$patch(account);

            // Fetch symbols data
            getSymbols();

            axios.defaults.withCredentials = true;

            if (account.is_admin) {
                router.push("/admin/requestverification");
            } else {
                router.push("/transfer");
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                toast.warning(err.response.data.error, {
                    timeout: 5000,
                });
            } else {
                toast.error(err.response.data.error, {
                    timeout: 5000,
                });
            }
        });
};

const getSymbols = () => {
    axios
        .get("http://localhost:8080/get-symbols", {
            withCredentials: true,
        })
        .then((response) => {
            let symbols = response.data.symbols;
            const store = useSymbolsStore();

            store.symbols = symbols;
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<template>
    <main class="flex flex-1 justify-center my-16 mx-32 items-center gap-x-32">
        <form
            class="flex flex-col w-1/4 gap-y-4"
            @submit="(event: Event) => login(event)"
        >
            <h1 class="text-6xl font-extrabold uppercase text-center mb-4">
                - Login -
            </h1>
            <TextInput
                v-model:input-value="email"
                input-id="email"
                label-text="Email"
                placeholder="Enter your email"
                input-type="email"
                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                required="true"
            />
            <TextInput
                v-model:input-value="password"
                input-id="password"
                label-text="Password"
                placeholder="Enter your password"
                input-type="password"
                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                required="true"
            />
            <button
                class="normal-button bg-main-green border-main-green hover:text-white hover:scale-105"
                type="submit"
            >
                Login
            </button>
            <div class="flex gap-x-1 justify-center">
                <p>Don't have an account?</p>
                <RouterLink
                    to="/register"
                    class="text-blue-400 visited:text-blue-700 underline"
                    >Create one</RouterLink
                >
            </div>
        </form>
        <div
            class="flex flex-col items-center justify-center rounded-full bg-main-green w-[32rem] h-[32rem]"
        >
            <img src="/Logo.png" alt="Big Logo" class="w-1/2" />
            <h1 class="text-3xl text-center font-extrabold">
                YOUR SOLUTION FOR MONEY
            </h1>
        </div>
    </main>
</template>
