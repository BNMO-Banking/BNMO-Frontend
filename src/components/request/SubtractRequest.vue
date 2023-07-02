<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import SlotTextInput from "../form/SlotTextInput.vue";
import MultiSelectInput from "../form/MultiSelectInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useCurrencyStore } from "../../store/currency.store";
import { useRequestStore } from "../../store/request.store";
import RequestReqAxios from "../../types/request.type";
import { RequestType } from "../../enum/reqtype.enum";
import CheckboxInput from "../form/CheckboxInput.vue";
import EnterPin from "../../components/modal/EnterPin.vue";

const authStore = useAuthStore();
const currencyStore = useCurrencyStore();
const requestStore = useRequestStore();

const { account } = storeToRefs(authStore);
const { symbols, isLoadingSymbols } = storeToRefs(currencyStore);
const form = ref({} as RequestReqAxios);
const confirmation = ref(false);
const tnc = ref(false);
const pinModal = ref(false);

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

const request = (pin: string) => {
    form.value.amount = Number(form.value.amount);
    form.value.pin = pin;
    requestStore.postRequest(form.value);
    pinModal.value = false;
};

onMounted(() => {
    form.value.id = account.value.id;
    form.value.request_type = RequestType.SUBTRACT;
    form.value.currency = "AED";
});

const emit = defineEmits<{ (event: "tc_clicked", payload: boolean): void }>();
</script>

<template>
    <EnterPin
        v-if="pinModal"
        @close-modal="pinModal = false"
        @pin="(pin: string) => request(pin)"
    />
    <div
        class="grid grid-rows-auto-7 grid-cols-1 p-4 shadow-md border-2 border-main-red gap-y-4 justify-self-center"
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
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                    clip-rule="evenodd"
                />
            </svg>
            <h3 class="uppercase">Subtract balance</h3>
        </div>
        <p class="text-center">
            You can request the <b>deduction</b> of funds from your account for any listed currency.
            Our administrative team will promptly verify your request and notify you accordingly.
        </p>
        <span class="flex w-full items-center gap-x-2">
            <h5 class="font-bold uppercase w-1/4 lg:w-[12.5%]">From</h5>
            <p>:</p>
            <h5 class="font-bold uppercase w-full">
                {{ account.account_number }}
            </h5>
        </span>
        <SlotTextInput
            v-model="form.amount"
            id="sub_amount"
            label=""
            placeholder="Enter amount"
            type="text"
        >
            <MultiSelectInput
                id="sub_currency"
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
        <CheckboxInput id="check_conf_sub" required @checked="confCheck"
            >I hereby confirm my request for {{ form.currency }}
            {{ form.amount ? form.amount : 0 }} to be deducted from my account.</CheckboxInput
        >
        <CheckboxInput id="check_tc_sub" required @checked="tcCheck"
            >I hereby agree to the
            <span
                class="text-blue-700 hover:underline cursor-pointer"
                @click="emit('tc_clicked', true)"
                >terms and conditions</span
            ></CheckboxInput
        >
        <button
            class="normal-button bg-main-red border-main-red hover:text-white hover:scale-[1.02]"
            type="submit"
            v-if="form.amount >= 0 && tnc && confirmation"
            @click="pinModal = true"
        >
            Request
        </button>
        <button
            class="disabled-button bg-main-red/60 border-main-red/0"
            type="submit"
            disabled
            v-else
        >
            Request
        </button>
    </div>
</template>
../../types/model/request.type ../../types/request.type
