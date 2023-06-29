<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import SlotTextInput from "../form/SlotTextInput.vue";
import MultiSelectInput from "../form/MultiSelectInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useCurrencyStore } from "../../store/currency.store";
import { useRequestStore } from "../../store/request.store";
import { RequestReqAxios } from "../../types/axios/request.type";
import { RequestType } from "../../enum/reqtype.enum";
import CheckboxInput from "../form/CheckboxInput.vue";

const authStore = useAuthStore();
const currencyStore = useCurrencyStore();
const requestStore = useRequestStore();

const { account } = storeToRefs(authStore);
const { symbols, isLoadingSymbols } = storeToRefs(currencyStore);
const form = ref({} as RequestReqAxios);
const confirmation = ref(false);
const tnc = ref(false);

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

const request = () => {
    requestStore.postRequest(form.value);
};

onMounted(() => {
    form.value.id = account.value.id;
    form.value.request_type = RequestType.ADD;
    form.value.currency = "AED";
});
</script>

<template>
    <div
        class="grid grid-rows-auto-7 grid-cols-1 p-4 shadow-md border-2 border-main-green gap-y-4 justify-self-center"
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
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clip-rule="evenodd"
                />
            </svg>
            <h2 class="text-3xl font-extrabold uppercase">Add balance</h2>
        </div>
        <p class="text-center">
            You can request <b>additional</b> funds from any currency listed, directly to your
            account. Our administrative team will promptly verify your request and notify you
            accordingly.
        </p>
        <span class="flex w-full items-center gap-x-4">
            <h4 class="font-bold uppercase w-1/8">To:</h4>
            <h4 class="font-bold uppercase w-full">
                {{ account.account_number }}
            </h4>
        </span>
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
        <CheckboxInput id="check_conf" required @checked="confCheck"
            >I hereby confirm my request for {{ form.currency }}
            {{ form.amount ? form.amount : 0 }} to be credited to my account.</CheckboxInput
        >
        <CheckboxInput id="check_tc" required @checked="tcCheck"
            >I hereby agree to the terms and conditions</CheckboxInput
        >
        <button
            class="normal-button bg-main-green border-main-green hover:text-white hover:scale-[1.02]"
            type="submit"
            v-if="form.amount >= 0 && tnc"
            @click="request"
        >
            Request
        </button>
        <button
            class="disabled-button bg-main-green/60 border-main-green/0"
            type="submit"
            disabled
            v-else
        >
            Request
        </button>
    </div>
</template>
