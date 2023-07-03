<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";
import { EditProfileReq } from "../../types/profile.type";
import SlotTextInput from "../form/SlotTextInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useProfileStore } from "../../store/profile.store";
import { storeToRefs } from "pinia";

const props = defineProps({
    accountType: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const { accountType, fullName, email, username, phoneNumber } = toRefs(props);

const editPhone = ref(false);
const form = ref({} as EditProfileReq);
const authStore = useAuthStore();
const profileStore = useProfileStore();

const { account } = storeToRefs(authStore);

const updateProfile = () => {
    const formData = new FormData();
    formData.append("phone_number", "+62" + form.value.phone_number);
    profileStore.editProfile(account.value.id, formData);
    editPhone.value = false;
};

onMounted(() => {
    form.value.phone_number = phoneNumber.value.substring(3);
});
</script>

<template>
    <div class="flex flex-col w-full gap-y-4">
        <span
            class="flex w-1/5 items-center justify-center rounded-full p-2 bg-main-blue font-extrabold hover:scale-105 cursor-default"
        >
            {{ accountType }}
        </span>
        <h1>{{ fullName }}</h1>
        <div class="flex items-center gap-x-16 border-t-2 border-main-green py-4">
            <div class="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                <h4>{{ username }}</h4>
            </div>
            <div class="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                >
                    <path
                        d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
                    />
                    <path
                        d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
                    />
                </svg>
                <h4>{{ email }}</h4>
            </div>
            <div class="flex items-center gap-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                >
                    <path
                        fill-rule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clip-rule="evenodd"
                    />
                </svg>
                <h4 v-if="!editPhone">{{ phoneNumber }}</h4>
                <svg
                    v-if="!editPhone"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 opacity-50 hover:opacity-100 cursor-pointer"
                    @click="editPhone = true"
                >
                    <path
                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                    />
                </svg>
                <SlotTextInput
                    v-else
                    v-model="form.phone_number"
                    id="phone_number"
                    label=""
                    placeholder="New phone number"
                    type="text"
                    required
                >
                    <template #left-side><p class="slot-input-left-side h-full">+62</p></template>
                    <template #right-side>
                        <div
                            class="flex items-center justify-center border-t border-r border-b border-black h-full p-2 cursor-pointer"
                            :class="
                                form.phone_number.length > 0 &&
                                form.phone_number !== phoneNumber.substring(3)
                                    ? `bg-main-green`
                                    : `bg-main-red`
                            "
                        >
                            <svg
                                v-if="
                                    form.phone_number.length > 0 &&
                                    form.phone_number !== phoneNumber.substring(3)
                                "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                                @click="updateProfile"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                                @click="editPhone = false"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </template>
                </SlotTextInput>
            </div>
        </div>
    </div>
</template>
