<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import { useAccountStore } from "../../store/account";

const store = useAccountStore();
const toast = useToast();

const emit = defineEmits(["showModal", "addedAcc"]);

const accNumber = ref("");
const invalidNumber = ref(false);
const checkNumber = ref(false);
const destination = ref("Click check to view");
const errMessage = ref("");

const formatAccNumber = (newValue: string) => {
    let formatted = newValue;
    if (newValue.length === 3) {
        formatted += "-";
    } else if (newValue.length === 7) {
        formatted += "-";
    }

    if (newValue.length !== 12) {
        invalidNumber.value = true;
        errMessage.value = "Invalid account number (Must be XXX-XXX-XXXX)";
    } else {
        if (newValue === store.account_number) {
            invalidNumber.value = true;
            errMessage.value = "You cannot insert your own account number";
        } else {
            invalidNumber.value = false;
        }
    }

    accNumber.value = formatted;
};

const checkDestination = () => {
    axios
        .post("http://localhost:8080/check-destination", {
            destination_number: accNumber.value,
        })
        .then((response) => {
            destination.value = response.data.name;
            checkNumber.value = true;
        })
        .catch((err) => {
            checkNumber.value = false;
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

const addDestination = () => {
    const data = {
        user_id: store.ID,
        destination_number: accNumber.value,
    };
    axios
        .post("http://localhost:8080/add-destination", data)
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            emit("showModal", false);
            emit("addedAcc", true);
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex flex-col w-2/5 rounded-md bg-white items-center p-8"
            @click.stop
        >
            <h2 class="text-3xl font-extrabold uppercase text-center mb-4">
                Add new destination
            </h2>
            <div class="flex flex-col w-full">
                <label for="account-number">Account Number</label>
                <input
                    :value="accNumber"
                    @input="formatAccNumber($event.target.value)"
                    id="account-number"
                    placeholder="Enter your destination account number"
                    type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required
                />
            </div>
            <h4 class="font-bold uppercase w-full m-4" v-if="!invalidNumber">
                Destination Name: {{ destination }}
            </h4>
            <h4 class="font-bold text-main-red uppercase w-full m-4" v-else>
                {{ errMessage }}
            </h4>
            <div class="flex w-full items-center gap-x-4">
                <button
                    class="normal-button bg-main-yellow border-main-yellow hover:text-white hover:scale-[1.02] w-full"
                    type="submit"
                    v-if="!invalidNumber"
                    @click="checkDestination"
                >
                    Check
                </button>
                <button
                    class="normal-button bg-main-yellow/60 border-main-yellow/0 w-full"
                    type="submit"
                    disabled
                    v-else
                >
                    Check
                </button>
                <button
                    class="normal-button bg-main-green border-main-green hover:text-white hover:scale-[1.02] w-full"
                    type="submit"
                    v-if="!invalidNumber && checkNumber"
                    @click="addDestination"
                >
                    Add
                </button>
                <button
                    class="normal-button bg-main-green/60 border-main-green/0 w-full"
                    type="submit"
                    disabled
                    v-else
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>
