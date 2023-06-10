<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
import CustomerData from "../../types/customer-data";
import ValuedTextInput from "../form/ValuedTextInput.vue";

const toast = useToast();

const props = defineProps<{
    data: CustomerData;
}>();

const emit = defineEmits(["showModal"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});

const firstName = ref(props.data.first_name);
const lastName = ref(props.data.last_name);
const email = ref(props.data.email);
const username = ref(props.data.username);
const balance = ref(props.data.balance);

const editData = (event: Event) => {
    event.preventDefault();
    const data = {
        id: props.data.ID,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        username: username.value,
        balance: Number(balance.value),
    };
    axios
        .put("http://localhost:8080/admin/edit-data", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message);
            emit("showModal", false);
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.error);
        });
};
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex flex-col rounded-md bg-white items-center gap-y-4 justify-center p-8 w-1/3"
            @click.stop
        >
            <h4 class="text-3xl font-bold uppercase text-center" v-once>
                Edit Data
            </h4>
            <form
                class="flex flex-col items-center justify-center w-full p-4 gap-y-4"
            >
                <ValuedTextInput
                    :optional-value="firstName"
                    v-model:input-value="firstName"
                    input-id="first-name"
                    label-text="First Name"
                    placeholder="Enter the new first name"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                />
                <ValuedTextInput
                    :optional-value="lastName"
                    v-model:input-value="lastName"
                    input-id="last-name"
                    label-text="Last Name"
                    placeholder="Enter the new last name"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                />
                <ValuedTextInput
                    :optional-value="email"
                    v-model:input-value="email"
                    input-id="email"
                    label-text="Email"
                    placeholder="Enter the new email"
                    input-type="email"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                />
                <ValuedTextInput
                    :optional-value="username"
                    v-model:input-value="username"
                    input-id="username"
                    label-text="Username"
                    placeholder="Enter the new username"
                    input-type="text"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                />
                <ValuedTextInput
                    :optional-value="balance"
                    v-model:input-value="balance"
                    input-id="balance"
                    label-text="Balance"
                    placeholder="Enter the new balance"
                    input-type="number"
                    class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                />
                <button
                    class="normal-button bg-main-green border-main-green hover:scale-105 w-full"
                    type="submit"
                    @click="editData($event)"
                >
                    Edit Data
                </button>
            </form>
        </div>
    </div>
</template>
