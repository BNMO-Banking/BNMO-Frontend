<script setup lang="ts">
import { ref } from "vue";
import { RegisterReqAxios } from "../../types/axios/auth.type";
import { useAuthStore } from "../../store/auth.store";
import TextInput from "../form/TextInput.vue";
import TextAreaInput from "../form/TextAreaInput.vue";
import SlotTextInput from "../form/SlotTextInput.vue";
import FileDropZone from "../form/FileDropZone.vue";

const form = ref({} as RegisterReqAxios);
const previewSrc = ref("");

const uploadFile = (file: File) => {
    form.value.id_card = file;
    previewSrc.value = URL.createObjectURL(file);
};

const register = (event: Event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("first_name", form.value.first_name);
    data.append("last_name", form.value.last_name);
    data.append("email", form.value.email);
    data.append("username", form.value.username);
    data.append("phone_number", "+62" + form.value.phone_number);
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
                <SlotTextInput
                    v-model="form.phone_number"
                    id="phone_number"
                    label="Phone number"
                    placeholder="Enter your phone number"
                    type="text"
                    required
                    ><p
                        class="flex items-center border-l border-t border-b border-black bg-gray-300 px-2 h-full"
                    >
                        +62
                    </p></SlotTextInput
                >
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
            <div class="grid grid-rows-auto-3 lg:grid-rows-auto-2 grid-cols-1 lg:grid-cols-2 gap-4">
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
                <div class="flex flex-col">
                    <p>ID Card</p>
                    <FileDropZone @upload-file="uploadFile"></FileDropZone>
                </div>
                <div class="flex flex-col">
                    <p>Preview</p>
                    <img
                        v-if="previewSrc.length > 0"
                        :src="previewSrc"
                        class="h-48 justify-self-center self-center"
                    />
                    <div
                        v-else
                        class="flex flex-col items-center justify-center w-full h-full border-2 border-black border-dashed"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-12 h-12"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <p class="text-center">Your ID Card will be shown here for preview</p>
                    </div>
                </div>
            </div>
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
