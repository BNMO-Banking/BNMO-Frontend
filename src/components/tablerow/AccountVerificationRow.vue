<script setup lang="ts">
import RequestAccount from "../../types/account-request";

defineProps<{
    data: RequestAccount;
    index: number;
    validateAccount: void;
}>();

defineEmits(["openModal", "imageData", "accept", "reject"]);
</script>

<template>
    <tr class="border-b border-black">
        <td>{{ index }}</td>
        <td>{{ data.first_name }}</td>
        <td>{{ data.last_name }}</td>
        <td>{{ data.email }}</td>
        <td>{{ data.username }}</td>
        <td>
            <button
                class="table-button bg-main-yellow border-main-yellow hover:scale-110 my-2"
                @click="
                    $emit('openModal', true),
                        $emit('imageData', data.image_path)
                "
            >
                Open Image
            </button>
        </td>
        <td class="flex justify-center gap-x-4">
            <button
                class="table-button bg-main-green border-main-green hover:scale-110 my-2"
                @click="$emit('accept', data.ID)"
            >
                Accept</button
            ><button
                class="table-button bg-main-red border-main-red hover:scale-110 my-2"
                @click="$emit('reject', data.ID)"
            >
                Reject
            </button>
        </td>
    </tr>
</template>
