<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAccountStore } from "../../../store/account";
import TextInput from "../../form/TextInput.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import router from "../../../router/router";
import ChangeImage from "../../modal/ChangeImage.vue";

const toast = useToast();

const store = useAccountStore();
const isBlur = ref(false);
const blurMessage = computed(() => {
    return isBlur.value ? "Hide Image" : "View Image";
});

// Pin refs and watch
const pin = ref("");
const repeatPin = ref("");
const pinMessage = ref("Set PIN");
const pinSet = ref(false);

watch([pin, repeatPin], ([newPin, newRepeatPin]) => {
    if (newPin.length < 6) {
        pinMessage.value = "PIN too short";
    } else if (newPin.length > 6) {
        pinMessage.value = "PIN too long";
    } else {
        if (newRepeatPin !== pin.value) {
            pinMessage.value = "Mismatch PIN";
        } else {
            pinMessage.value = "Set PIN";
        }
    }
});

// Password refs and watch
const oldPass = ref("");
const newPass = ref("");
const repeatPass = ref("");
const passMessage = ref("Change password");

watch(
    [oldPass, newPass, repeatPass],
    ([newOldPass, newNewPass, newRepeatPass]) => {
        if (newOldPass.length < 8) {
            passMessage.value = "Old password too short";
        } else {
            if (newNewPass.length < 8) {
                passMessage.value = "New password too short";
            } else {
                if (newRepeatPass !== newPass.value) {
                    passMessage.value = "Mismatch password";
                } else {
                    passMessage.value = "Change password";
                }
            }
        }
    }
);

// Upload image refs
const showModal = ref(false);

const checkPin = () => {
    axios
        .get(`http://localhost:8080/check-pin?id=${store.ID}`, {
            withCredentials: true,
        })
        .then((response) => {
            pinSet.value = response.data.pin_set;
        })
        .catch((err) => {
            console.log(err);
        });
};

const changePin = (event: Event) => {
    event.preventDefault();
    if (pin.value === "") {
        return;
    }

    const data = {
        id: store.ID,
        pin: pin.value,
        repeat_pin: repeatPin.value,
    };
    axios
        .put("http://localhost:8080/change-pin", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            checkPin();
            (document.getElementById("new-pin") as HTMLInputElement).value = "";
            (document.getElementById("repeat-pin") as HTMLInputElement).value =
                "";
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

const changePass = (event: Event) => {
    event.preventDefault();
    if (oldPass.value === "") {
        return;
    }

    const data = {
        id: store.ID,
        old_pass: oldPass.value,
        new_pass: newPass.value,
        repeat_pass: repeatPass.value,
    };
    axios
        .put("http://localhost:8080/change-password", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            (
                document.getElementById("cur-password") as HTMLInputElement
            ).value = "";
            (
                document.getElementById("new-password") as HTMLInputElement
            ).value = "";
            (
                document.getElementById("repeat-password") as HTMLInputElement
            ).value = "";
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

watch(
    router.currentRoute,
    () => {
        checkPin();
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <ChangeImage
        v-if="showModal"
        :id="store.ID"
        :image_path="store.image_path"
        @show-modal="(flag: boolean) => showModal = flag"
    />
    <main class="flex flex-col mx-16 my-8 gap-y-8">
        <section class="flex flex-1 w-full gap-x-16 max-h-screen">
            <div class="flex flex-col w-1/2 gap-y-8 justify-between">
                <!-- Name, email, and username div -->
                <div
                    class="flex items-center p-8 gap-x-8 bg-white drop-shadow-2xl rounded-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-32 h-32"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <div class="flex flex-col">
                        <h1 class="text-4xl font-extrabold uppercase">
                            {{ store.first_name }} {{ store.last_name }}
                        </h1>
                        <div class="flex items-center gap-x-8">
                            <h4 class="text-lg font-bold">
                                {{ store.email }}
                            </h4>
                            <h4 class="text-lg font-bold">|</h4>
                            <h4 class="text-lg font-bold">
                                {{ store.username }}
                            </h4>
                        </div>
                        <p>
                            Registered on
                            {{
                                new Date(store.CreatedAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )
                            }}
                        </p>
                    </div>
                </div>
                <!-- Account information div -->
                <div
                    class="flex flex-col items-center justify-center bg-white drop-shadow-2xl rounded-lg p-8 w-full"
                >
                    <div class="flex items-center justify-center mb-4 gap-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>

                        <h4 class="text-3xl font-extrabold uppercase">
                            Account information
                        </h4>
                    </div>
                    <div
                        class="flex flex-col bg-main-green rounded-xl shadow-xl p-8 w-[30rem] h-60 hover:scale-110 transition"
                    >
                        <div class="flex justify-between mb-8">
                            <img
                                src="/Logo.png"
                                class="text-4xl font-extrabold uppercase w-48"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-16 h-16"
                            >
                                <path
                                    d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                        <div class="flex justify-between">
                            <h4 class="text-xl font-bold">Account Number:</h4>
                            <h4 class="text-xl font-bold">Balance:</h4>
                        </div>
                        <div class="flex justify-between">
                            <h4 class="text-xl font-bold">
                                {{ store.account_number }}
                            </h4>
                            <h4 class="text-xl font-bold">
                                {{
                                    store.balance.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "IDR",
                                    })
                                }}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-1/2 gap-y-8 justify-between">
                <!-- Account details div  -->
                <div
                    class="flex flex-col items-center gap-y-4 bg-white drop-shadow-2xl rounded-xl p-8 w-full"
                >
                    <div class="flex items-center justify-center gap-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                        </svg>

                        <h4 class="text-3xl font-extrabold uppercase">
                            Account identification
                        </h4>
                    </div>
                    <div class="flex items-center justify-center gap-x-8">
                        <img
                            :src="store.image_path"
                            :class="
                                isBlur
                                    ? `transition max-w-48 max-h-48`
                                    : `blur-lg transition max-w-48 max-h-48`
                            "
                        />
                        <div
                            class="flex flex-col items-center justify-center gap-y-4"
                        >
                            <button
                                class="normal-button w-48 bg-main-yellow border-main-yellow hover:scale-105"
                                @click="isBlur = !isBlur"
                            >
                                {{ blurMessage }}
                            </button>
                            <button
                                class="normal-button w-48 bg-main-green border-main-green hover:scale-105"
                                @click="showModal = true"
                            >
                                Update Image
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Change pin div -->
                <div
                    class="flex flex-col items-center gap-y-4 bg-white drop-shadow-2xl rounded-xl p-8 w-full"
                >
                    <div class="flex items-center justify-center gap-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                            />
                        </svg>

                        <h4 class="text-3xl font-extrabold uppercase">
                            Account pin
                        </h4>
                    </div>
                    <form
                        class="flex flex-col items-center justify-center gap-y-4"
                        v-if="!pinSet"
                    >
                        <div class="flex items-center justify-center gap-x-4">
                            <TextInput
                                v-model:input-value="pin"
                                input-id="new-pin"
                                label-text="New PIN"
                                placeholder="Enter your new pin"
                                input-type="password"
                                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                            />
                            <TextInput
                                v-model:input-value="repeatPin"
                                input-id="repeat-pin"
                                label-text="Repeat PIN"
                                placeholder="Repeat your new pin"
                                input-type="password"
                                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                            />
                        </div>
                        <button
                            :class="
                                pinMessage !== `Set PIN`
                                    ? `normal-button w-full bg-main-red border-main-red`
                                    : `normal-button w-full bg-main-red border-main-red hover:scale-105`
                            "
                            :disabled="pinMessage !== `Set PIN`"
                            type="submit"
                            @click="changePin($event)"
                        >
                            {{ pinMessage }}
                        </button>
                    </form>
                    <p class="text-xl font-bold text-center" v-else>
                        PIN has been set. Please contact an administrator to
                        change it.
                    </p>
                </div>
            </div>
        </section>
        <section class="flex flex-1 items-center w-full gap-x-16">
            <div
                class="flex flex-col items-center justify-center w-full gap-y-8"
            >
                <div
                    class="flex flex-col items-center gap-y-4 bg-white drop-shadow-2xl rounded-xl p-8 w-full"
                >
                    <div class="flex items-center justify-center gap-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-10 h-10"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                clip-rule="evenodd"
                            />
                        </svg>

                        <h4 class="text-3xl font-extrabold uppercase">
                            Change your password
                        </h4>
                    </div>
                    <form
                        class="flex flex-col items-center justify-center gap-y-4"
                    >
                        <div class="flex items-center justify-center gap-x-4">
                            <TextInput
                                v-model:input-value="oldPass"
                                input-id="cur-password"
                                label-text="Current Password"
                                placeholder="Enter your old password"
                                input-type="password"
                                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                            />
                            <TextInput
                                v-model:input-value="newPass"
                                input-id="new-password"
                                label-text="New Password"
                                placeholder="Enter your new password"
                                input-type="password"
                                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                            />
                            <TextInput
                                v-model:input-value="repeatPass"
                                input-id="repeat-password"
                                label-text="Confirm Password"
                                placeholder="Repeat your password"
                                input-type="password"
                                class="rounded-xl px-4 py-2 border shadow-md appearance-none"
                            />
                        </div>
                        <button
                            :class="
                                passMessage !== `Change password`
                                    ? `normal-button w-full bg-main-red border-main-red`
                                    : `normal-button w-full bg-main-red border-main-red hover:scale-105`
                            "
                            :disabled="passMessage !== `Change password`"
                            type="submit"
                            @click="changePass($event)"
                        >
                            {{ passMessage }}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </main>
</template>
