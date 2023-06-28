<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import ValuedTextInput from "../../form/ValuedTextInput.vue";
// import { useAuthStore } from "../../../store/auth.store";
import { useCurrencyStore } from "../../../store/currency.store";
// import { useRequestStore } from "../../../store/request.store";
import { storeToRefs } from "pinia";
// import { RequestReqAxios } from "../../../types/axios/request.type";

let intervalId: number;

// const authStore = useAuthStore();
const currencyStore = useCurrencyStore();
// const requestStore = useRequestStore();

// const { account } = storeToRefs(authStore);

const { symbols, isLoadingSymbols, errorSymbols, isLoadingBalance, errBalance } =
    storeToRefs(currencyStore);

currencyStore.getSymbols();

// Form refs
const addForm = ref({
    amount: "",
    currency: "AED"
});

const subtractForm = ref({
    amount: "",
    currency: "AED"
});

// const request = (type: string) => {
//     let data: RequestReqAxios;
//     if (type === "add") {
//         const amount = parseInt(addForm.value.amount.replace(/,/g, ""));
//         data = {
//             destination_id: account.value.ID,
//             request_type: type,
//             amount: amount,
//             currency: addForm.value.currency
//         };
//     } else if (type === "subtract") {
//         const amount = parseInt(subtractForm.value.amount.replace(/,/g, ""));
//         data = {
//             destination_id: account.value.ID,
//             request_type: type,
//             amount: amount,
//             currency: subtractForm.value.currency
//         };
//     } else {
//         return;
//     }

//     requestStore.postRequest(data);
// };

watch(
    () => addForm.value.amount,
    (newValue) => {
        const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        nextTick(() => (addForm.value.amount = result));
    }
);

watch(
    () => subtractForm.value.amount,
    (newValue) => {
        const result = newValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        nextTick(() => (subtractForm.value.amount = result));
    }
);

onMounted(() => {
    intervalId = setInterval(() => {
        // currencyStore.getUpdatedBalance(account.value.ID);
    }, 15000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <h1 class="text-6xl font-extrabold uppercase text-center m-8">- Request -</h1>
    <h2 class="text-3xl font-extrabold uppercase text-center" v-if="isLoadingBalance">
        Fetching balance...
    </h2>
    <h2 class="text-3xl font-extrabold uppercase text-center" v-else>
        <!-- Current balance: IDR {{ account.balance.toLocaleString("en-US") }} -->
    </h2>
    <h2 class="text-3xl font-extrabold uppercase text-center text-main-red" v-if="errBalance">
        {{ errBalance }}
    </h2>
    <main class="flex flex-1 items-center justify-center gap-x-8">
        <div class="flex flex-col p-4 shadow-md w-2/5 border-2 border-main-green gap-y-4">
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
            <span class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">To:</h4>
                <h4 class="font-bold uppercase w-full">
                    <!-- {{ account.account_number }} -->
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">Currency:</h4>
                <div v-if="isLoadingSymbols" class="flex w-full items-center justify-center">
                    <svg
                        aria-hidden="true"
                        class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-main-green"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <p>Fetching currencies...</p>
                </div>
                <div v-if="errorSymbols" class="flex w-full items-center justify-center">
                    <p>{{ errorSymbols }}</p>
                </div>
                <select
                    v-if="!isLoadingSymbols"
                    class="rounded-md border border-main-green p-2 w-full"
                    @change="addForm.currency = ($event.target as HTMLSelectElement).value"
                >
                    <option v-for="(name, code) in symbols" :key="code" :value="code">
                        {{ code }} - {{ name }}
                    </option>
                </select>
            </div>
            <ValuedTextInput
                :optional-value="addForm.amount"
                input-id="add-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="text"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
            />
            <button
                class="normal-button bg-main-green border-main-green hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="parseInt(addForm.amount) >= 0"
            >
                Request
            </button>
            <button
                class="normal-button bg-main-green/60 border-main-green/0"
                type="submit"
                disabled
                v-else
            >
                Request
            </button>
        </div>
        <div class="flex flex-col p-4 shadow-md w-2/5 border-2 border-main-red gap-y-4">
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

                <h2 class="text-3xl font-extrabold uppercase">Subtract balance</h2>
            </div>
            <span class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">From:</h4>
                <h4 class="font-bold uppercase w-full">
                    <!-- {{ account.account_number }} -->
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">Currency:</h4>
                <div v-if="isLoadingSymbols" class="flex w-full items-center justify-center">
                    <svg
                        aria-hidden="true"
                        class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-main-green"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <p>Fetching currencies...</p>
                </div>
                <div v-if="errorSymbols" class="flex w-full items-center justify-center">
                    <p>{{ errorSymbols }}</p>
                </div>
                <select
                    v-if="!isLoadingSymbols"
                    class="rounded-md border border-main-red p-2 w-full"
                    @change="subtractForm.currency = ($event.target as HTMLSelectElement).value"
                >
                    <option v-for="(name, code) in symbols" :key="code" :value="code">
                        {{ code }} - {{ name }}
                    </option>
                </select>
            </div>
            <ValuedTextInput
                :optional-value="subtractForm.amount"
                input-id="subtract-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="text"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
            />
            <button
                class="normal-button bg-main-red border-main-red hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="parseInt(subtractForm.amount) >= 0"
            >
                Request
            </button>
            <button
                class="normal-button bg-main-red/60 border-main-red/0"
                type="submit"
                disabled
                v-else
            >
                Request
            </button>
        </div>
    </main>
</template>
