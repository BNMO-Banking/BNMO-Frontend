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

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chartOptions: {
        type: Object as () => ChartOptions,
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
    <Bar v-if="!isLoading" :id="id" :options="chartOptions" :data="chartData" />
</template>
