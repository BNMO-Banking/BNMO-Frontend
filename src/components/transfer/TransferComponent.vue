<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import SlotTextInput from "../form/SlotTextInput.vue";
import MultiSelectInput from "../form/MultiSelectInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useCurrencyStore } from "../../store/currency.store";
import { useTransferStore } from "../../store/transfer.store";
import CheckboxInput from "../form/CheckboxInput.vue";
import EnterPin from "../../components/modal/EnterPin.vue";
import { TransferReqAxios } from "../../types/transfer.type";

const authStore = useAuthStore();
const currencyStore = useCurrencyStore();
const transferStore = useTransferStore();

const { account } = storeToRefs(authStore);
const { symbols, isLoadingSymbols } = storeToRefs(currencyStore);
const { destinations, isLoadingDestinations } = storeToRefs(transferStore);
transferStore.getDestinationList(account.value.id);

const form = ref({} as TransferReqAxios);
const confirmation = ref(false);
const tnc = ref(false);
const pinModal = ref(false);

const selectDestination = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    form.value.destination_number = selected.value;
};

const selectCurrency = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    form.value.currency = selected.value;
};

const confCheck = (event: Event) => {
    const check = event.target as HTMLInputElement;
    confirmation.value = check.checked;
};

const tcCheck = (event: Event) => {
    const check = event.target as HTMLInputElement;
    tnc.value = check.checked;
};

const transfer = (pin: string) => {
    form.value.amount = Number(form.value.amount);
    form.value.pin = pin;
    transferStore.postTransfer(form.value);
    pinModal.value = false;
};

onMounted(() => {
    form.value.id = account.value.id;
    form.value.currency = "AED";
});

const emit = defineEmits<{ (event: "tc_clicked", payload: boolean): void }>();
</script>

<template>
    <EnterPin
        v-if="pinModal"
        @close-modal="pinModal = false"
        @pin="(pin: string) => transfer(pin)"
    />
    <div
        class="grid grid-rows-auto-7 grid-cols-1 p-4 shadow-md border-2 border-main-blue gap-y-4 justify-self-center"
    >
        <div class="flex items-center gap-x-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
            >
                <path
                    fill-rule="evenodd"
                    d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                    clip-rule="evenodd"
                />
            </svg>

            <h3 class="uppercase">Transfer</h3>
        </div>
        <p class="text-center">
            You can <b>transfer</b> funds from your account to the listed accounts you have added
            with any of the listed currencies.
        </p>
        <span class="flex w-full items-center gap-x-2">
            <h5 class="font-bold uppercase w-1/4 lg:w-[12.5%]">From</h5>
            <p>:</p>
            <h5 class="font-bold uppercase w-full">
                {{ account.account_number }}
            </h5>
        </span>
        <MultiSelectInput
            id="transfer_dest"
            label="Transfer Destination"
            required
            :is-loading="isLoadingDestinations"
            @select-event="selectDestination"
        >
            <option v-if="destinations.length === 0" selected disabled>
                Please add a new transfer destination first
            </option>
            <option v-else selected disabled>Select your transfer destination</option>
            <option
                v-for="dest in destinations"
                :key="dest.account_number"
                :value="dest.account_number"
            >
                {{ dest.account_number }} - {{ dest.first_name }} {{ dest.last_name }}
            </option></MultiSelectInput
        >
        <SlotTextInput
            v-model="form.amount"
            id="add_amount"
            label=""
            placeholder="Enter amount"
            type="text"
        >
            <MultiSelectInput
                id="add_currency"
                label=""
                is-slot
                required
                :is-loading="isLoadingSymbols"
                @select-event="selectCurrency"
            >
                <option v-for="(_, code) in symbols" :key="code" :value="code">
                    {{ code }}
                </option>
            </MultiSelectInput>
        </SlotTextInput>
        <CheckboxInput
            v-if="form.destination_number"
            id="check_conf_add"
            required
            @checked="confCheck"
            >I hereby confirm my request to transfer {{ form.currency }}
            {{ form.amount ? form.amount : 0 }} to the account number
            {{ form.destination_number }}.</CheckboxInput
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
            class="normal-button bg-main-blue border-main-blue hover:text-white hover:scale-[1.02]"
            type="submit"
            v-if="form.destination_number && form.amount >= 0 && tnc && confirmation"
            @click="pinModal = true"
        >
            Transfer
        </button>
        <button
            class="disabled-button bg-main-blue/60 border-main-blue/0"
            type="submit"
            disabled
            v-else
        >
            Transfer
        </button>
    </div>
</template>
