<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RequestType } from "../../enum/reqtype.enum";
import { Status } from "../../enum/status.enum";
import RequestData from "../../types/request-verif.type";
import { useRequestVerificationStore } from "../../store/request-verification.store";
import { RejectRemarksReq } from "../../types/request-verif.type";

const props = defineProps({
    data: {
        type: Object as () => RequestData,
        required: true
    },
    width: {
        type: Array<string>,
        required: true
    },
    checked: {
        type: Boolean
    }
});

const emit = defineEmits<{ (event: "checked", payload: string): void }>();

const remarks = ref({} as RejectRemarksReq);
const error = ref("");
const store = useRequestVerificationStore();
const validateRequest = (id: string, isAccepted: boolean) => {
    if (!isAccepted && remarks.value.remarks.length === 0) {
        error.value = "Please fill the remarks section to reject";
    } else {
        store.postValidateRequest(
            id,
            isAccepted ? Status.ACCEPTED : Status.REJECTED,
            remarks.value
        );
    }
};

onMounted(() => {
    remarks.value.remarks = props.data.remarks;
});
</script>

<template>
    <div
        class="w-full flex p-4 items-center justify-between gap-x-4"
        :class="
            data.request_type === RequestType.ADD
                ? `bg-main-green/20 hover:bg-main-green/30 border-2 border-main-green`
                : `bg-main-red/20 hover:bg-main-red/30 border-2 border-main-red`
        "
    >
        <input
            :class="width[0]"
            class="w-4 h-4"
            type="checkbox"
            :checked="checked"
            @change="emit('checked', data.id)"
        />
        <div :class="width[1]" class="flex items-center justify-center gap-x-2 p-4">
            <svg
                v-if="data.request_type === RequestType.ADD"
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
            <svg
                v-if="data.request_type === RequestType.SUBTRACT"
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
            <h3>{{ data.request_type }}</h3>
        </div>
        <div :class="width[2]" class="flex flex-col border-l-2 border-r-2 border-black pl-2">
            <div class="flex gap-x-2">
                <p class="w-2/5">Requester</p>
                <p>:</p>
                <p>{{ data.first_name }} {{ data.last_name }}</p>
            </div>
            <div class="flex gap-x-2">
                <p class="w-2/5">Account number</p>
                <p>:</p>
                <p>{{ data.account_number }}</p>
            </div>
            <div class="flex gap-x-2">
                <p class="w-2/5">Phone number</p>
                <p>:</p>
                <p>{{ data.phone_number }}</p>
            </div>
            <div class="flex gap-x-2">
                <p class="w-2/5">Request time</p>
                <p>:</p>
                <p>
                    {{
                        new Date(data.created_at).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    }}
                </p>
            </div>
            <div class="flex gap-x-2">
                <p class="w-2/5">
                    {{
                        data.status === Status.ACCEPTED
                            ? "Accept"
                            : data.status === Status.REJECTED
                            ? "Reject"
                            : "Update"
                    }}
                    time
                </p>
                <p>:</p>
                <p>
                    {{
                        data.status !== Status.PENDING
                            ? new Date(data.updated_at).toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit"
                              })
                            : "No action done"
                    }}
                </p>
            </div>
        </div>
        <div :class="width[3]" class="flex flex-col border-r-2 border-black pr-2">
            <div class="flex gap-x-2">
                <p class="w-1/4">Status</p>
                <p>:</p>
                <p>{{ data.status }}</p>
            </div>
            <div class="flex gap-x-2">
                <p class="w-1/4">Conversion</p>
                <p>:</p>
                <div class="flex gap-x-2 items-center">
                    <p>{{ data.currency }} {{ data.amount }}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                    <p>IDR {{ data.converted_amount }}</p>
                </div>
            </div>
            <div class="flex gap-x-2">
                <p class="w-1/4">Remarks</p>
                <p>:</p>
                <textarea
                    v-model="remarks.remarks"
                    rows="3"
                    class="border border-black overflow-auto w-[70%] resize-none"
                    :disabled="data.status !== Status.PENDING"
                ></textarea>
            </div>
        </div>
        <div :class="width[4]" class="flex flex-col items-center justify-center gap-y-2">
            <div class="flex gap-x-4">
                <button class="action-yes" @click="validateRequest(data.id, true)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <button class="action-no" @click="validateRequest(data.id, false)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <p class="text-center text-main-red">{{ error }}</p>
        </div>
    </div>
</template>
../../types/request-verif.type
