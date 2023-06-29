<script setup lang="ts">
import { LoginReqAxios } from "../../types/axios/auth.type";
import TextInput from "../form/TextInput.vue";
import { ref } from "vue";
import { useAuthStore } from "../../store/auth.store";

const form = ref({} as LoginReqAxios);

const login = (event: Event) => {
    event.preventDefault();

    const authStore = useAuthStore();
    authStore.postLogin(form.value);
};
</script>

<template>
    <main class="flex flex-1 justify-center my-16 mx-0 sm:mx-32 items-center gap-x-32">
        <form class="flex flex-col w-3/4 lg:w-1/3 xl:w-1/4 gap-y-4" @submit="login">
            <h1 class="font-extrabold uppercase text-center mb-4">- Login -</h1>
            <TextInput
                v-model="form.email_username"
                id="email_username"
                label="Email or username"
                placeholder="Email or username"
                type="text"
                class="drop-shadow-lg"
                required
            />
            <TextInput
                v-model="form.password"
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                class="drop-shadow-lg"
                required
            />
            <button class="normal-button bg-main-green" type="submit">Login</button>
            <p class="text-center">
                Don't have an account?
                <RouterLink to="/register" class="text-blue-400 visited:text-blue-700 underline"
                    >Create one</RouterLink
                >
            </p>
        </form>
        <div
            class="hidden flex-col items-center justify-center rounded-full bg-main-green w-[32rem] h-[32rem] xl:flex"
        >
            <img src="/Logo.png" alt="Big Logo" class="w-1/2" />
            <h1 class="text-3xl text-center font-extrabold">YOUR SOLUTION FOR MONEY</h1>
        </div>
    </main>
</template>
