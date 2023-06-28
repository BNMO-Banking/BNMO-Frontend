<script setup lang="ts">
import TextInput from "../form/TextInput.vue";
// import FileInput from "../form/FileInput.vue";
import { RegisterReqAxios } from "../../types/axios/auth.type";
import { ref, computed } from "vue";
import { useAuthStore } from "../../store/auth.store";
import TextAreaInput from "../form/TextAreaInput.vue";

const form = ref({} as RegisterReqAxios);
const errorMessage = ref("");

const register = (event: Event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("first_name", form.value.first_name);
    data.append("last_name", form.value.last_name);
    data.append("email", form.value.email);
    data.append("username", form.value.username);
    data.append("phone_number", form.value.phone_number);
    data.append("address_line1", form.value.address_line1);
    data.append("address_line2", form.value.address_line2);
    data.append("city", form.value.city);
    data.append("state", form.value.state);
    data.append("postal_code", form.value.postal_code);
    data.append("country", form.value.country);
    data.append("id_card", form.value.id_card as Blob, form.value.id_card.name);
    data.append("password", form.value.password);
    data.append("confirm_password", form.value.confirm_password);

    const authStore = useAuthStore();
    authStore.postRegister(data);
};

// watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
//     console.log(file.value);
//     if (newPassword.length >= 8) {
//         console.log("masuk");
//         if (newPassword !== newConfirmPassword) {
//             errorMessage.value = "Incorrect confirm password";
//         } else {
//             errorMessage.value = "";
//         }
//     } else {
//         errorMessage.value = "Password must be 8 characters or more";
//     }
// });

const showError = computed(() => {
    return errorMessage.value !== "";
});
</script>

<template>
    <main class="flex flex-1 justify-center my-16 mx-0 sm:mx-32 items-center gap-x-32">
        <form class="flex flex-col w-3/4 gap-y-4" @submit="(event: Event) => register(event)">
            <h1 class="text-center mb-4">- Register -</h1>
            <h3 class="col-span-2">Personal Information</h3>
            <div class="grid grid-rows-5 lg:grid-rows-3 grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                    v-model="form.first_name"
                    id="firstName"
                    label="First name"
                    placeholder="Enter your first name"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.last_name"
                    id="lastName"
                    label="Last name"
                    placeholder="Enter your last name"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.email"
                    id="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                />
                <TextInput
                    v-model="form.username"
                    id="username"
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.phone_number"
                    id="phone_number"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    type="text"
                    required
                />
            </div>

            <h3 class="col-span-2 mt-8">Address Information</h3>
            <div class="grid grid-rows-auto-6 lg:grid-rows-auto-3 grid-cols-1 lg:grid-cols-2 gap-4">
                <TextAreaInput
                    v-model="form.address_line1"
                    id="addressline1"
                    label="Address line 1"
                    placeholder="Enter your first address line"
                    type="text"
                    required
                />
                <TextAreaInput
                    v-model="form.address_line2"
                    id="addressline2"
                    label="Address line 2 (Optional)"
                    placeholder="Enter your second address line"
                    type="text"
                />
                <TextInput
                    v-model="form.city"
                    id="city"
                    label="City"
                    placeholder="Enter your city"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.state"
                    id="state"
                    label="State"
                    placeholder="Enter your state"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.postal_code"
                    id="postal_code"
                    label="Postal code"
                    placeholder="Enter your postal code"
                    type="text"
                    required
                />
                <TextInput
                    v-model="form.country"
                    id="country"
                    label="Country"
                    placeholder="Enter your country"
                    type="text"
                    required
                />
            </div>

            <h3 class="col-span-2 mt-8">Verification & Security</h3>
            <div class="grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                    v-model="form.password"
                    id="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    required
                />
                <TextInput
                    v-model="form.confirm_password"
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    type="password"
                    required
                />
            </div>
            <!-- <FileInput
                input-id="image"
                label-text="Image"
                class="hover:bg-main-green rounded-full px-4 py-2"
            /> -->
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
    </main>
</template>
