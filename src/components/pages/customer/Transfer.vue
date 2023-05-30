<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import TextInput from "../../form/TextInput.vue";
import { useAccountStore } from "../../../store/account";
import axios from "axios";
import TransferDestination from "../../../types/transfer-destination";
import AddDestination from "../../modal/AddDestination.vue";
import { useToast } from "vue-toastification";
import router from "../../../router/router";
import { useSymbolsStore } from "../../../store/symbols";

const toast = useToast();
let intervalId: number;

const accountStore = useAccountStore();
const symbolStore = useSymbolsStore();

// Setting destination refs
const showModal = ref(false);
const addedAcc = ref(false);
const transferAmount = ref(0);
const transferDest = ref<TransferDestination[]>();
const destination = ref("");

// Setting currency refs
const currency = ref("AED");

const getTransferDestination = () => {
    axios
        .get(`http://localhost:8080/get-destination?id=${accountStore.ID}`, {
            withCredentials: true,
        })
        .then((response) => {
            transferDest.value = response.data.destinations;
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

const transfer = () => {
    const data = {
        source_id: accountStore.ID,
        destination: destination.value,
        amount: Number(transferAmount.value),
        currency: currency.value,
    };
    axios
        .post("http://localhost:8080/transfer", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            (
                document.getElementById("transfer-amount") as HTMLInputElement
            ).value = "";
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

watch(
    [router.currentRoute, addedAcc],
    () => {
        getTransferDestination();
        addedAcc.value = false;
    },
    { immediate: true }
);

onMounted(() => {
    intervalId = setInterval(() => {
        axios
            .get(`http://localhost:8080/update-balance?id=${accountStore.ID}`)
            .then((response) => {
                accountStore.balance = response.data.balance;
            })
            .catch((err) => {
                console.log(err);
            });
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
        @added-acc="(flag: boolean) => addedAcc = flag"
    />
    <h1 class="text-6xl font-extrabold uppercase text-center m-8">
        - Transfer -
    </h1>
    <h2 class="text-3xl font-extrabold uppercase text-center">
        Current balance: IDR {{ accountStore.balance.toLocaleString("en-US") }}
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
                    {{ accountStore.account_number }}
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">To:</h4>
                <select
                    class="rounded-md border border-main-blue p-2 w-full"
                    @change="destination = $event.target.value"
                >
                    <option value="default" selected disabled>
                        Choose your destination
                    </option>
                    <option
                        v-for="dest in transferDest"
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
                <select
                    class="rounded-md border border-main-blue p-2 w-full"
                    @change="currency = $event.target.value"
                >
                    <option
                        v-for="(name, code) in symbolStore.symbols"
                        :key="code"
                        :value="code"
                    >
                        {{ code }} - {{ name }}
                    </option>
                </select>
            </div>
            <TextInput
                v-model:input-value="transferAmount"
                input-id="transfer-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="number"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
                required="true"
            />
            <h4
                class="font-bold uppercase text-main-red"
                v-if="transferAmount < 0"
            >
                Amount may not be negative
            </h4>
            <button
                class="normal-button bg-main-blue border-main-blue hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="transferAmount >= 0"
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
