<script setup lang="ts">
import { Status } from "../../enum/status.enum";
import AccountData from "../../types/account-verif.type";
import { useAccountVerificationStore } from "../../store/account-verification.store";

defineProps({
    data: {
        type: Object as () => AccountData,
        required: true
    },
    width: {
        type: Array<string>,
        required: true
    },
    checked: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "checked", payload: string): void }>();

const store = useAccountVerificationStore();
const validateAccount = (id: string, isAccepted: boolean) => {
    store.postValidateAccount(id, isAccepted ? Status.ACCEPTED : Status.REJECTED);
};
</script>

<template>
    <div
        class="w-full flex flex-col p-4 items-center gap-y-4"
        :class="
            data.status === Status.ACCEPTED
                ? `bg-main-green/20 hover:bg-main-green/30 border-2 border-main-green`
                : data.status === Status.REJECTED
                ? `bg-main-red/20 hover:bg-main-red/30 border-2 border-main-red`
                : `bg-main-yellow/20 hover:bg-main-yellow/30 border-2 border-main-yellow`
        "
    >
        <div class="w-full flex flex-col items-center justify-between xl:flex-row xl:gap-x-4">
            <input
                :class="width[0]"
                class="w-4 h-4 hidden xl:block"
                type="checkbox"
                :checked="checked"
                @change="emit('checked', data.id)"
            />
            <div
                :class="width[1]"
                class="flex w-full flex-col border-b-2 xl:border-b-0 xl:border-r-2 border-black pl-0 xl:pl-2 gap-y-2"
            >
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">First name</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.first_name }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Last name</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.last_name }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Phone number</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.phone_number }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Request time</p>
                    <p class="hidden lg:flex">:</p>
                    <p>
                        {{
                            new Date(data.created_at).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })
                        }}
                    </p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">
                        {{
                            data.status === Status.ACCEPTED
                                ? "Accept"
                                : data.status === Status.REJECTED
                                ? "Reject"
                                : "Update"
                        }}
                        time
                    </p>
                    <p class="hidden lg:flex">:</p>
                    <p>
                        {{
                            data.status !== Status.PENDING
                                ? new Date(data.updated_at).toLocaleDateString("en-US", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit"
                                  })
                                : "No action done"
                        }}
                    </p>
                </div>
            </div>
            <div
                :class="width[2]"
                class="flex w-full flex-col xl:border-r-2 border-black pr-0 xl:pr-2 gap-y-2"
            >
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Status</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.status }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">City</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.city }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">State</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.state }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Postal code</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.postal_code }}</p>
                </div>
                <div class="flex flex-col lg:flex-row gap-x-2">
                    <p class="w-full lg:w-1/4 font-bold">Country</p>
                    <p class="hidden lg:flex">:</p>
                    <p>{{ data.country }}</p>
                </div>
            </div>
            <div :class="width[3]" class="flex w-full flex-col pr-0 xl:pr-2 gap-y-2">
                <div class="flex flex-col gap-x-2">
                    <p class="w-full font-bold">ID card (hover to expand)</p>
                    <div class="w-full h-32">
                        <img
                            :src="data.id_card_path"
                            class="max-h-32 hover:scale-[3] hover:z-[5]"
                        />
                    </div>
                </div>
            </div>
            <div :class="width[4]" class="flex items-center justify-center gap-x-4 mt-4 xl:mt-0">
                <button class="action-yes" @click="validateAccount(data.id, true)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <button class="action-no" @click="validateAccount(data.id, false)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex flex-col xl:flex-row w-full border-t-2 border-black">
            <div
                class="flex flex-col w-full xl:w-1/2 py-2 px-0 xl:px-4 xl:border-r-2 xl:border-black"
            >
                <p class="w-full lg:w-1/4 font-bold">Address line 1</p>
                <p>{{ data.address_line_1 }}</p>
            </div>
            <div class="flex flex-col w-full xl:w-1/2 py-2 px-0 xl:px-4">
                <p class="w-full lg:w-1/4 font-bold">Address line 2</p>
                <p>{{ data.address_line_2 }}</p>
            </div>
        </div>
    </div>
</template>
