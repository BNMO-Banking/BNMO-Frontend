<script setup lang="ts">
import RequestMoney from "../../types/money-request";

defineProps<{
    data: RequestMoney;
    index: number;
    validateAccount: void;
}>();

defineEmits(["accept", "reject"]);
</script>

<template>
    <tr class="border-b border-black">
        <td>{{ index }}</td>
        <td>{{ data.account_number }}</td>
        <td class="uppercase text-main-green font-bold" v-if="data.request_type == `add`">
            {{ data.request_type }}
        </td>
        <td class="uppercase text-main-red font-bold" v-else-if="data.request_type == `subtract`">
            {{ data.request_type }}
        </td>
        <td>{{ data.currency }}</td>
        <td>
            {{
                data.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: data.currency
                })
            }}
        </td>
        <td>
            {{
                data.converted_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR"
                })
            }}
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
