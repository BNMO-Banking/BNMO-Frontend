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
    <main class="flex flex-1 justify-center my-16 mx-32 items-center gap-x-32">
        <form class="flex flex-col w-1/4 gap-y-4" @submit="login">
            <h1 class="text-6xl font-extrabold uppercase text-center mb-4">- Login -</h1>
            <TextInput
                v-model="form.email_username"
                id="email_username"
                label="Email or username"
                placeholder="Email or username"
                type="text"
                required
            />
            <TextInput
                v-model="form.password"
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                required
            />
            <button class="normal-button bg-main-green" type="submit">Login</button>
            <div class="flex gap-x-1 justify-center">
                <p>Don't have an account?</p>
                <RouterLink to="/register" class="text-blue-400 visited:text-blue-700 underline"
                    >Create one</RouterLink
                >
            </div>
        </form>
        <div
            class="flex flex-col items-center justify-center rounded-full bg-main-green w-[32rem] h-[32rem]"
        >
            <img src="/Logo.png" alt="Big Logo" class="w-1/2" />
            <h1 class="text-3xl text-center font-extrabold">YOUR SOLUTION FOR MONEY</h1>
        </div>
    </main>
</template>
