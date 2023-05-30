<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TextInput from "../../form/TextInput.vue";
import { useAccountStore } from "../../../store/account";
import { useSymbolsStore } from "../../../store/symbols";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
let intervalId: number;

const accountStore = useAccountStore();
const symbolStore = useSymbolsStore();

const addAmount = ref(0);
const addCurrency = ref("AED");
const subtractAmount = ref(0);
const subtractCurrency = ref("AED");

const request = (type: string) => {
    let data;
    if (type === "add") {
        data = {
            destination_id: accountStore.ID,
            request_type: type,
            amount: Number(addAmount.value),
            currency: addCurrency.value,
        };
    } else if (type === "subtract") {
        data = {
            destination_id: accountStore.ID,
            request_type: type,
            amount: Number(subtractAmount.value),
            currency: subtractCurrency.value,
        };
    }
    axios
        .post("http://localhost:8080/request-money", data)
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            if (type === "add") {
                (
                    document.getElementById("add-amount") as HTMLInputElement
                ).value = "";
            } else if (type === "subtract") {
                (
                    document.getElementById(
                        "subtract-amount"
                    ) as HTMLInputElement
                ).value = "";
            }
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

onMounted(() => {
    console.log(document.cookie);
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
    <h1 class="text-6xl font-extrabold uppercase text-center m-8">
        - Request -
    </h1>
    <h2 class="text-3xl font-extrabold uppercase text-center">
        Current balance: IDR {{ accountStore.balance.toLocaleString("en-US") }}
    </h2>
    <main class="flex flex-1 items-center justify-center gap-x-8">
        <div
            class="flex flex-col p-4 shadow-md w-2/5 border-2 border-main-green gap-y-4"
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
            <span class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">To:</h4>
                <h4 class="font-bold uppercase w-full">
                    {{ accountStore.account_number }}
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">Currency:</h4>
                <select
                    class="rounded-md border border-main-green p-2 w-full"
                    @change="addCurrency = $event.target.value"
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
                v-model:input-value="addAmount"
                input-id="add-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="number"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
            />
            <h4 class="font-bold uppercase text-main-red" v-if="addAmount < 0">
                Amount may not be negative
            </h4>
            <button
                class="normal-button bg-main-green border-main-green hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="addAmount >= 0"
                @click="request(`add`)"
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
        <div
            class="flex flex-col p-4 shadow-md w-2/5 border-2 border-main-red gap-y-4"
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

                <h2 class="text-3xl font-extrabold uppercase">
                    Subtract balance
                </h2>
            </div>
            <span class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">From:</h4>
                <h4 class="font-bold uppercase w-full">
                    {{ accountStore.account_number }}
                </h4>
            </span>
            <div class="flex w-full items-center gap-x-4">
                <h4 class="font-bold uppercase w-1/4">Currency:</h4>
                <select
                    class="rounded-md border border-main-red p-2 w-full"
                    @change="subtractCurrency = $event.target.value"
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
                v-model:input-value="subtractAmount"
                input-id="subtract-amount"
                label-text="Amount"
                placeholder="Enter your desired amount"
                input-type="number"
                class="rounded-md px-4 py-2 border shadow-md appearance-none"
            />
            <h4
                class="font-bold uppercase text-main-red"
                v-if="subtractAmount < 0"
            >
                Amount may not be negative
            </h4>
            <button
                class="normal-button bg-main-red border-main-red hover:text-white hover:scale-[1.02]"
                type="submit"
                v-if="subtractAmount >= 0"
                @click="request(`subtract`)"
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
