<script setup lang="ts">
import {
    ChartData,
    ChartOptions,
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from "chart.js";
import { toRefs } from "vue";
import { Bar } from "vue-chartjs";
import SpinnerLoading from "../form/SpinnerLoading.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chartOptions: {
        type: Object as () => ChartOptions<"bar">,
        required: true
    },
    chartData: {
        type: Object as () => ChartData<"bar">,
        required: true
    },
    isLoading: {
        type: Boolean
    }
});

const { isLoading } = toRefs(props);

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<template>
    <div v-if="isLoading" class="flex h-full items-center justify-center">
        <SpinnerLoading :is-loading="isLoading" size="w-16 h-16" />
    </div>
    <Bar v-if="!isLoading" :id="id" :options="chartOptions" :data="chartData" />
</template>
