<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import ValuedTextInput from "../../form/ValuedTextInput.vue";
import AddDestination from "../../modal/AddDestination.vue";
import { useAuthStore } from "../../../store/auth.store";
import { useCurrencyStore } from "../../../store/currency.store";
import { useTransferStore } from "../../../store/transfer.store";
import { storeToRefs } from "pinia";

let intervalId: number;

const authStore = useAuthStore()
const currencyStore = useCurrencyStore()
const transferStore = useTransferStore()

const { account } = storeToRefs(authStore)

const { 
    symbols, 
    isLoadingSymbols, 
    errorSymbols,
    isLoadingBalance,
    errBalance } = storeToRefs(currencyStore)

currencyStore.getSymbols()

const { 
    transferDestinations, 
    isLoadingDestinations, 
    errorDestinations } = storeToRefs(transferStore)

transferStore.getTransferDestinations(account.value.ID)

// Form refs
const form = ref({
    source_id: account.value.ID,
    destination: "",
    amount: "",
    currency: "AED"
})

// Setting destination refs
const showModal = ref(false);
const accountAdded = ref(false);

const transfer = () => {
    const amount = parseInt(form.value.amount.replace(/,/g, ""))
    const data = {
        source_id: form.value.source_id,
        destination: form.value.destination,
        amount: amount,
        currency: form.value.currency,
    };
    
    transferStore.postTransfer(data)
};

watch(
    accountAdded,
    () => {
        transferStore.getTransferDestinations(account.value.ID);
        accountAdded.value = false;
    },
    { 
        immediate: true 
    }
);

watch(
    () => form.value.amount,
    (newValue) => {
        const result = newValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        nextTick(() => (form.value.amount = result))
    },
    {
        deep: true
    }
)

onMounted(() => {
    intervalId = setInterval(() => {
        currencyStore.getUpdatedBalance(account.value.ID)
    }, 15000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <AddDestination
        v-if="showModal"
        @show-modal="(flag: boolean) => showModal = flag"
        @account-added="(flag: boolean) => accountAdded = flag"
    />
    <h1 class="text-6xl font-extrabold uppercase text-center m-8">
        - Transfer -
    </h1>
    <h2 class="text-3xl font-extrabold uppercase text-center" v-if="isLoadingBalance">
        Fetching balance...
    </h2>
    <h2 class="text-3xl font-extrabold uppercase text-center" v-else>
        Current balance: IDR {{ account.balance.toLocaleString("en-US") }}
    </h2>
    <h2 class="text-3xl font-extrabold uppercase text-center text-main-red" v-if="errBalance">
        {{ errBalance }}
    </h2>
    <main class="flex flex-1 items-center justify-center gap-x-8">
        <div
            class="flex flex-col p-4 shadow-md w-2/5 border-2 border-main-blue gap-y-4"
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

                <h2 class="text-3xl font-extrabold uppercase">
                    Transfer balance
                </h2>
            </div>
            <span class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">From:</h4>
                <h4 class="font-bold uppercase w-full">
                    {{ account.account_number }}
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">To:</h4>
                <div v-if="isLoadingDestinations" class="flex w-full items-center justify-center">
                    <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-main-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <p>Fetching destinations...</p>
                </div>
                <div v-if="errorDestinations" class="flex w-full items-center justify-center">
                    <p>{{ errorDestinations }}</p>
                </div>
                <select
                    v-if="!isLoadingDestinations"
                    class="rounded-md border border-main-blue p-2 w-full"
                    @change="form.destination = $event.target.value"
                >
                    <option v-if="transferDestinations.length === 0" selected disabled>
                        No destinations found
                    </option>
                    <option v-else value="default" selected disabled>
                        Choose your destination
                    </option>
                    <option
                        v-for="dest in transferDestinations"
                        :key="dest.account_number"
                        :value="dest.account_number"
                    >
                        {{ dest.account_number }} [{{ dest.first_name }}
                        {{ dest.last_name }} - {{ dest.username }}]
                    </option>
                </select>
            </div>
            <div
                class="flex w-full items-center justify-center gap-x-4 hover:scale-105 cursor-pointer"
                @click="showModal = true"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                <h4 class="font-bold uppercase">Add new destination</h4>
            </div>

            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">Currency:</h4>
                <div v-if="isLoadingSymbols" class="flex w-full items-center justify-center">
                    <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-main-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <p>Fetching currencies...</p>
                </div>
                <div v-if="errorSymbols" class="flex w-full items-center justify-center">
                    <p>{{ errorSymbols }}</p>
                </div>
                <select 
                    v-if="!isLoadingSymbols"
                    class="rounded-md border border-main-blue p-2 w-full"
                    @change="form.currency = $event.target.value"
                >
                    <option
                        v-for="(name, code) in symbols"
                        :key="code"
                        :value="code"
                    >
                        {{ code }} - {{ name }}
                    </option>
                </select>
            </div>
            <ValuedTextInput
                v-model:input-value="form.amount"
                :optional-value="form.amount"
                input-id="transfer-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="text"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
                required="true"
            />
            <button
                class="normal-button bg-main-blue border-main-blue hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="parseInt(form.amount) >= 0"
                @click="transfer"
            >
                Transfer
            </button>
            <button
                class="normal-button bg-main-red border-main-red"
                type="submit"
                disabled
                v-else
            >
                Transfer
            </button>
        </div>
    </main>
</template>
