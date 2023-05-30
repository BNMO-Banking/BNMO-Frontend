<script setup lang="ts">
import RequestHistory from "../../types/request-history";

defineProps<{
    data: RequestHistory;
    index: number;
}>();
</script>

<template>
    <tr class="border-b border-black">
        <td class="py-2">{{ index }}</td>
        <td
            class="py-2 uppercase text-main-green font-bold"
            v-if="data.request_type == `add`"
        >
            {{ data.request_type }}
        </td>
        <td
            class="py-2 uppercase text-main-red font-bold"
            v-else-if="data.request_type == `subtract`"
        >
            {{ data.request_type }}
        </td>
        <td class="py-2">{{ data.currency }}</td>
        <td class="py-2">
            {{
                data.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: data.currency,
                })
            }}
        </td>
        <td class="py-2">
            {{
                data.converted_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                })
            }}
        </td>
        <td
            class="py-2 uppercase text-main-green font-bold"
            v-if="data.status == `accepted`"
        >
            {{ data.status }}
        </td>
        <td
            class="py-2 uppercase text-main-red font-bold"
            v-else-if="data.status == `rejected`"
        >
            {{ data.status }}
        </td>
        <td
            class="py-2 uppercase text-main-yellow font-bold"
            v-else-if="data.status == `pending`"
        >
            {{ data.status }}
        </td>
        <td class="py-2">
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
    </tr>
</template>
