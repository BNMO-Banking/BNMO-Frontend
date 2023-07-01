<script setup lang="ts">
import { ref } from "vue";
import { LoginReqAxios } from "../types/axios/auth.type";
import SlotTextInput from "../components/form/SlotTextInput.vue";
import { useAuthStore } from "../store/auth.store";

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
            <h1 class="mb-4">- Login -</h1>
            <SlotTextInput
                v-model="form.email_username"
                id="email_username"
                label="Email or username"
                placeholder="Email or username"
                type="text"
                class="drop-shadow-lg"
                required
            >
                <div class="slot-input-left-side">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </SlotTextInput>
            <SlotTextInput
                v-model="form.password"
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                class="drop-shadow-lg"
                required
            >
                <div class="slot-input-left-side">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clip-rule="evenodd"
                        />
                    </svg></div
            ></SlotTextInput>
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
../types/auth.type
