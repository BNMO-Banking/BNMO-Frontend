<script setup lang="ts">
import SpinnerLoading from "../../components/form/SpinnerLoading.vue";
import BankCard from "../../components/profile/BankCard.vue";
import CustomerAddress from "../../components/profile/CustomerAddress.vue";
import ProfileHeader from "../../components/profile/ProfileHeader.vue";
import ProfilePicture from "../../components/profile/ProfilePicture.vue";
import { useAuthStore } from "../../store/auth.store";
import { useProfileStore } from "../../store/profile.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { account } = storeToRefs(authStore);
const { profile, isLoadingProfile } = storeToRefs(profileStore);
profileStore.getProfile(account.value.id);
</script>

<template>
    <div v-if="isLoadingProfile" class="flex items-center justify-center h-screen">
        <SpinnerLoading :is-loading="isLoadingProfile" size="w-16 h-16" />
    </div>
    <main v-else class="flex flex-col px-8 lg:px-64">
        <div class="flex flex-col lg:flex-row py-8 gap-x-16 gap-y-4 lg:gap-y-0 items-center">
            <ProfilePicture :profile-pic="profile.profile_pic_path" />
            <ProfileHeader
                :account-type="profile.account_type"
                :full-name="`${profile.first_name} ${profile.last_name}`"
                :email="profile.email"
                :username="profile.username"
                :phone-number="profile.phone_number"
            />
        </div>
        <div
            class="flex flex-col lg:flex-row justify-between pt-0 pb-8 lg:py-8 gap-x-16 gap-y-4 lg:gap-y-0 items-center"
        >
            <CustomerAddress
                :address-line1="profile.address_line_1"
                :address-line2="profile.address_line_2"
                :city="profile.city"
                :state="profile.state"
                :postal-code="profile.postal_code"
                :country="profile.country"
            />
            <BankCard
                :card-number="profile.card_number"
                :account-number="profile.account_number"
                :full-name="`${profile.first_name} ${profile.last_name}`"
            />
        </div>
    </main>
</template>
