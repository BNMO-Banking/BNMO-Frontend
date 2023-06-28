<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import ValuedTextInput from "../form/ValuedTextInput.vue";
// import { useAuthStore } from "../../store/auth.store";
import { useTransferStore } from "../../store/transfer.store";
import { storeToRefs } from "pinia";

// const authStore = useAuthStore();
const transferStore = useTransferStore();

const {
    destName,
    isLoadingCheckDestination,
    errorCheckDestination
    // isLoadingAddDestination,
    // errorAddDestination
} = storeToRefs(transferStore);

// const emit = defineEmits(["showModal", "accountAdded"]);

const requestedNumber = ref("");
const invalidNumber = ref(false);
const checkNumber = ref(false);
const errMessage = ref("");

// const checkDestination = () => {
//     const data = {
//         destination_number: requestedNumber.value
//     };

//     transferStore.postCheckDestination(data);
// };

// const addDestination = () => {
//     const data = {
//         user_id: authStore.account.ID,
//         destination_number: requestedNumber.value
//     };

//     transferStore.postAddDestination(data).then(() => {
//         if (!isLoadingAddDestination.value && errorAddDestination.value === null) {
//             emit("showModal", false);
//             emit("accountAdded", true);
//         }
//     });
// };

// watch(requestedNumber, (newValue) => {
//     checkNumber.value = false;
//     let formatted = newValue;
//     if (newValue.length === 3) {
//         formatted += "-";
//     } else if (newValue.length === 7) {
//         formatted += "-";
//     }

//     if (newValue.length !== 12) {
//         invalidNumber.value = true;
//         errMessage.value = "Invalid account number (Must be XXX-XXX-XXXX)";
//     } else {
//         if (newValue === authStore.account.account_number) {
//             invalidNumber.value = true;
//             errMessage.value = "You cannot insert your own account number";
//         } else {
//             invalidNumber.value = false;
//             checkDestination();
//         }
//     }

//     requestedNumber.value = formatted;
// });

watch([errorCheckDestination, invalidNumber], () => {
    if (errorCheckDestination.value) {
        destName.value = "Not Found";
        checkNumber.value = false;
    } else {
        if (!invalidNumber.value) {
            checkNumber.value = true;
        }
    }
});

onMounted(() => {
    document.body.style.overflow = "hidden";
    destName.value = "";
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
        <div class="flex flex-col w-2/5 rounded-md bg-white items-center p-8" @click.stop>
            <h2 class="text-3xl font-extrabold uppercase text-center mb-4">Add new destination</h2>
            <div class="flex flex-col w-full">
                <ValuedTextInput
                    :optional-value="requestedNumber"
                    input-id="account_number"
                    label-text="Account Number"
                    placeholder="Enter your destination account number"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                    required="true"
                />
            </div>
            <div class="flex items-center w-full m-4" v-if="!invalidNumber">
                <div class="flex items-center w-full" v-if="isLoadingCheckDestination">
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
                    <h4 class="font-bold uppercase w-full">Fetching destination name...</h4>
                </div>
                <div v-else>
                    <h4 class="font-bold uppercase w-full" v-if="destName === 'Not Found'">
                        Destination Name: <span class="text-main-red">{{ destName }}</span>
                    </h4>
                    <h4 class="font-bold uppercase w-full" v-else>
                        Destination Name: {{ destName }}
                    </h4>
                </div>
            </div>
            <h4
                class="font-bold text-main-red uppercase w-full m-4"
                v-if="invalidNumber && !isLoadingCheckDestination"
            >
                {{ errMessage }}
            </h4>
            <div class="flex w-full items-center gap-x-4">
                <button
                    class="normal-button bg-main-green border-main-green hover:text-white hover:scale-[1.02] w-full"
                    type="submit"
                    v-if="!invalidNumber && checkNumber"
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
