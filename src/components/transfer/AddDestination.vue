<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import SlotTextInput from "../form/SlotTextInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useTransferStore } from "../../store/transfer.store";
import CheckboxInput from "../form/CheckboxInput.vue";
import EnterPin from "../../components/modal/EnterPin.vue";
import { AddDestinationReq } from "../../types/associates.type";

const authStore = useAuthStore();
const transferStore = useTransferStore();

const { account } = storeToRefs(authStore);
const { destName, isLoadingCheckDestination } = storeToRefs(transferStore);

const form = ref<AddDestinationReq>({
    id: account.value.id,
    destination_number: "",
    pin: ""
});
const confirmation = ref(false);
const tnc = ref(false);
const pinModal = ref(false);

const checkDest = () => {
    transferStore.getCheckDestination(form.value.destination_number);
};

const confCheck = (event: Event) => {
    const check = event.target as HTMLInputElement;
    confirmation.value = check.checked;
};

const tcCheck = (event: Event) => {
    const check = event.target as HTMLInputElement;
    tnc.value = check.checked;
};

const addDest = (pin: string) => {
    form.value.pin = pin;
    transferStore.postAddDestination(form.value);
    pinModal.value = false;
};

onMounted(() => {
    form.value.id = account.value.id;
});

const emit = defineEmits<{ (event: "tc_clicked", payload: boolean): void }>();
</script>

<template>
    <EnterPin
        v-if="pinModal"
        @close-modal="pinModal = false"
        @pin="(pin: string) => addDest(pin)"
    />
    <div
        class="grid grid-rows-auto-7 grid-cols-1 p-4 shadow-md border-2 border-main-yellow gap-y-4 justify-self-center"
    >
        <div class="flex items-center gap-x-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
            >
                <path
                    d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"
                />
            </svg>

            <h3 class="uppercase">Add destination</h3>
        </div>
        <p class="text-center">
            You can add new transfer destinations here, and it will show as a possible transfer
            destination on the right.
        </p>
        <span class="flex w-full items-center gap-x-2">
            <h5 class="font-bold uppercase w-1/4 lg:w-[12.5%]">From</h5>
            <p>:</p>
            <h5 class="font-bold uppercase w-full">
                {{ account.account_number }}
            </h5>
        </span>
        <span class="flex w-full items-center gap-x-2">
            <h5 class="font-bold uppercase w-1/4 lg:w-[12.5%]">To</h5>
            <p>:</p>
            <h5 v-if="isLoadingCheckDestination" class="font-bold uppercase w-full">Fetching</h5>
            <h5 v-else class="font-bold uppercase w-full">
                {{ destName || "Enter destination number first" }}
            </h5>
        </span>
        <div class="w-full flex gap-x-4">
            <SlotTextInput
                v-model="form.destination_number"
                id="dest_number"
                label=""
                placeholder="Enter destination account number"
                type="text"
                required
            >
                <div class="slot-input-left-side">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                        <path
                            fill-rule="evenodd"
                            d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </SlotTextInput>
            <button
                class="normal-button bg-main-yellow w-1/4"
                :disabled="form.destination_number.length === 0"
                @click="checkDest"
            >
                Check
            </button>
        </div>
        <CheckboxInput v-if="destName" id="check_conf_add" required @checked="confCheck"
            >I hereby confirm my request to add {{ destName }} as a transfer
            destination</CheckboxInput
        >
        <CheckboxInput id="check_tc_add" required @checked="tcCheck"
            >I hereby agree to the
            <span
                class="text-blue-700 hover:underline cursor-pointer"
                @click="emit('tc_clicked', true)"
                >terms and conditions</span
            ></CheckboxInput
        >
        <button
            class="normal-button bg-main-yellow border-main-yellow hover:text-white hover:scale-[1.02]"
            type="submit"
            v-if="form.destination_number.length > 0 && tnc && confirmation"
            @click="pinModal = true"
        >
            Add
        </button>
        <button
            class="disabled-button bg-main-yellow/60 border-main-yellow/0"
            type="submit"
            disabled
            v-else
        >
            Add
        </button>
    </div>
</template>
