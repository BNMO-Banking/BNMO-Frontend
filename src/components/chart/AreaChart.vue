<script setup lang="ts">
import {
    ChartData,
    ChartOptions,
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    CategoryScale,
    LinearScale
} from "chart.js";
import { toRefs } from "vue";
import { Line } from "vue-chartjs";
import SpinnerLoading from "../form/SpinnerLoading.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chartOptions: {
        type: Object as () => ChartOptions<"line">,
        required: true
    },
    chartData: {
        type: Object as () => ChartData<"line">,
        required: true
    },
    isLoading: {
        type: Boolean
    }
});

const { isLoading } = toRefs(props);

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
    CategoryScale,
    LinearScale
);
</script>

<template>
    <div v-if="isLoading" class="flex h-full items-center justify-center">
        <SpinnerLoading :is-loading="isLoading" size="w-16 h-16" />
    </div>
    <Line v-if="!isLoading" :id="id" :options="chartOptions" :data="chartData" />
</template>
