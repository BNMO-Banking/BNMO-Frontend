<script setup lang="ts">
import TextInput from "../form/TextInput.vue";
// import { ref } from "vue";
// import { useAuthStore } from "../../store/auth.store";

// const email = ref("");
// const password = ref("");

// const login = (event: Event) => {
//     event.preventDefault();
//     const data = {
//         email: email.value,
//         password: password.value
//     };

//     const authStore = useAuthStore();
//     authStore.postLogin(data);
// };
</script>

<template>
    <main class="flex flex-1 justify-center my-16 mx-32 items-center gap-x-32">
        <form class="flex flex-col w-1/4 gap-y-4">
            <h1 class="text-6xl font-extrabold uppercase text-center mb-4">- Login -</h1>
            <TextInput
                input-id="email"
                label-text="Email"
                placeholder="Enter your email"
                input-type="email"
                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                required="true"
            />
            <TextInput
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
