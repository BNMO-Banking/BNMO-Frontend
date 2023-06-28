<script setup lang="ts">
import TextInput from "../form/TextInput.vue";
import FileInput from "../form/FileInput.vue";
import { ref, watch, computed } from "vue";
import { useAuthStore } from "../../store/auth.store";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const file = ref<File>();

const errorMessage = ref("");

const register = (event: Event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("first_name", firstName.value);
    data.append("last_name", lastName.value);
    data.append("username", username.value);
    data.append("email", email.value);
    data.append("password", password.value);
    data.append("image", file.value as Blob, file.value?.name);

    const authStore = useAuthStore();
    authStore.postRegister(data);
};

watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
    console.log(file.value);
    if (newPassword.length >= 8) {
        console.log("masuk");
        if (newPassword !== newConfirmPassword) {
            errorMessage.value = "Incorrect confirm password";
        } else {
            errorMessage.value = "";
        }
    } else {
        errorMessage.value = "Password must be 8 characters or more";
    }
});

const showError = computed(() => {
    return errorMessage.value !== "";
});
</script>

<template>
    <main class="flex flex-1 justify-center my-16 mx-32 items-center gap-x-32">
        <form class="flex flex-col w-1/3 gap-y-4" @submit="(event: Event) => register(event)">
            <h1 class="text-6xl font-extrabold uppercase text-center mb-4">- Register -</h1>
            <div class="flex justify-center items-center gap-x-4">
                <TextInput
                    input-id="firstName"
                    label-text="First name"
                    placeholder="Enter your first name"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
                <TextInput
                    input-id="lastName"
                    label-text="Last name"
                    placeholder="Enter your last name"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
            </div>
            <div class="flex justify-center items-center gap-x-4">
                <TextInput
                    input-id="username"
                    label-text="Username"
                    placeholder="Enter your username"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
                <TextInput
                    input-id="email"
                    label-text="Email"
                    placeholder="Enter your email"
                    input-type="email"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
            </div>
            <div class="flex justify-center items-center gap-x-4">
                <TextInput
                    input-id="password"
                    label-text="Password"
                    placeholder="Enter your password"
                    input-type="password"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
                <TextInput
                    input-id="confirmPassword"
                    label-text="Confirm Password"
                    placeholder="Re-enter your password"
                    input-type="password"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
            </div>
            <FileInput
                input-id="image"
                label-text="Image"
                class="hover:bg-main-green rounded-full px-4 py-2"
            />
            <p v-if="showError" class="text-main-red font-bold text-center">
                {{ errorMessage }}
            </p>
            <button
                class="normal-button bg-main-green border-main-green hover:text-white hover:scale-105"
                type="submit"
            >
                Register
            </button>
            <div class="flex gap-x-1 justify-center">
                <p>Already have an account?</p>
                <RouterLink to="/login" class="text-blue-400 visited:text-blue-700 underline"
                    >Log in</RouterLink
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
