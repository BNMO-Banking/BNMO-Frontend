<script setup lang="ts">
import CustomerData from "../../types/customer-data";

const props = defineProps<{
    data: CustomerData;
    index: number;
    openedId: number[];
}>();

const emit = defineEmits([
    "openImageModal",
    "imageData",
    "openDetails",
    "editData",
    "openHistory",
    "openReset",
    "openDelete",
]);

const editData = () => {
    emit("editData", {
        flag: true,
        data: props.data,
    });
};

const openRequestHistory = () => {
    emit("openHistory", {
        flag: true,
        id: props.data.ID,
        type: "request",
    });
};

const openTransferHistory = () => {
    emit("openHistory", {
        flag: true,
        id: props.data.ID,
        type: "transfer",
    });
};

const resetPin = () => {
    emit("openReset", {
        flag: true,
        id: props.data.ID,
    });
};

const deleteData = () => {
    emit("openDelete", {
        flag: true,
        id: props.data.ID,
    });
};
</script>

<template>
    <tr
        :class="
            openedId.includes(data.ID) ? `shadow-md` : `border-b border-black`
        "
    >
        <td>{{ index }}</td>
        <td>{{ data.first_name }}</td>
        <td>{{ data.last_name }}</td>
        <td>{{ data.email }}</td>
        <td>
            {{
                new Date(data.CreatedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            }}
        </td>
        <td>
            <button
                class="table-button bg-main-blue border-main-blue hover:scale-110 my-2"
                v-if="!openedId.includes(data.ID)"
                @click="$emit('openDetails', data.ID)"
            >
                Details
            </button>
            <button
                class="table-button bg-main-blue border-main-blue hover:scale-110 my-2"
                v-else
                @click="$emit('openDetails', data.ID)"
            >
                Close
            </button>
        </td>
    </tr>
    <tr v-if="openedId.includes(data.ID)">
        <td colspan="3" class="px-16 py-4">
            <span class="flex items-center justify-between w-full">
                <p class="font-bold">Account Number:</p>
                <p class="font-bold">
                    {{ data.account_number }}
                </p>
            </span>
        </td>
        <td colspan="1" class="px-16 py-4"></td>
        <td colspan="2" class="px-16 py-4">
            <div class="flex items-center justify-center gap-x-4">
                <button
                    class="table-button bg-main-yellow border-main-yellow hover:scale-110 w-3/5"
                    @click="
                        $emit('openImageModal', true);
                        $emit('imageData', data.image_path);
                    "
                >
                    View Image
                </button>
                <button
                    class="table-button bg-main-yellow border-main-yellow hover:scale-110 w-3/5"
                    @click="editData"
                >
                    Edit Data
                </button>
            </div>
        </td>
    </tr>
    <tr v-if="openedId.includes(data.ID)">
        <td colspan="3" class="px-16 py-4">
            <span class="flex items-center justify-between w-full">
                <p class="font-bold">Username:</p>
                <p class="font-bold">
                    {{ data.username }}
                </p>
            </span>
        </td>
        <td colspan="1" class="px-16 py-4">
            <p class="font-bold">Admin controls:</p>
        </td>
        <td colspan="2" class="px-16 py-4">
            <div class="flex items-center justify-center gap-x-4">
                <button
                    class="table-button bg-main-green border-main-green hover:scale-110 w-3/5"
                    @click="openRequestHistory"
                >
                    Request History
                </button>
                <button
                    class="table-button bg-main-green border-main-green hover:scale-110 w-3/5"
                    @click="openTransferHistory"
                >
                    Transfer History
                </button>
            </div>
        </td>
    </tr>
    <tr v-if="openedId.includes(data.ID)" class="border-b border-black">
        <td colspan="3" class="px-16 py-4">
            <span class="flex items-center justify-between w-full">
                <p class="font-bold">Balance:</p>
                <p class="font-bold">
                    {{
                        data.balance.toLocaleString("en-US", {
                            style: "currency",
                            currency: "IDR",
                        })
                    }}
                </p>
            </span>
        </td>
        <td colspan="1" class="px-16 py-4"></td>
        <td colspan="2" class="px-16 py-4">
            <div class="flex items-center justify-center gap-x-4">
                <button
                    class="table-button bg-main-red border-main-red hover:scale-110 w-3/5"
                    @click="resetPin"
                >
                    Reset PIN
                </button>
                <button
                    class="table-button bg-main-red border-main-red hover:scale-110 w-3/5"
                    @click="deleteData"
                >
                    Delete Data
                </button>
            </div>
        </td>
    </tr>
</template>
