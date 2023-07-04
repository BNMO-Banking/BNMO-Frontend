<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useAuthStore } from "../../store/auth.store";
import { useProfileStore } from "../../store/profile.store";
import { storeToRefs } from "pinia";

const props = defineProps({
    profilePic: {
        type: String,
        required: true
    }
});

const { profilePic } = toRefs(props);

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { account } = storeToRefs(authStore);

const input = ref();
const activateInput = () => {
    (input.value as HTMLInputElement).click();
};

const updateProfile = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
        return;
    }
    const file = input.files[0];
    const form = new FormData();
    form.append("profile_pic", file as Blob, file.name);
    profileStore.editProfile(account.value.id, form);
};
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-y-2">
        <div
            class="flex items-center justify-center drop-shadow-xl cursor-pointer h-72 w-80 max-h-72 max-w-80 hover:bg-[#333333]"
            :class="profilePic.length === 0 ? `p-8 bg-[#7a7979]` : `border border-black`"
            @click="activateInput"
        >
            <svg
                v-if="profilePic.length === 0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="w-56 h-56"
            >
                <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clip-rule="evenodd"
                />
            </svg>
            <img v-else :src="profilePic" class="w-full h-full object-cover" />
        </div>
        <input ref="input" type="file" class="hidden" accept="image/*" @change="updateProfile" />
        <p class="font-bold">Click image to change</p>
    </div>
</template>
