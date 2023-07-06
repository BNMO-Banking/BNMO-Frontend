<script setup lang="ts">
import {
    ChartData,
    ChartOptions,
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale
} from "chart.js";
import { toRefs } from "vue";
import { Doughnut } from "vue-chartjs";
import SpinnerLoading from "../form/SpinnerLoading.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    chartOptions: {
        type: Object as () => ChartOptions<"doughnut">,
        required: true
    },
    chartData: {
        type: Object as () => ChartData<"doughnut">,
        required: true
    },
    isLoading: {
        type: Boolean
    }
});

const { isLoading } = toRefs(props);

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
</script>

<template>
    <div v-if="isLoading" class="flex h-full items-center justify-center">
        <SpinnerLoading :is-loading="isLoading" size="w-16 h-16" />
    </div>
    <Doughnut v-if="!isLoading" :id="id" :options="chartOptions" :data="chartData" />
</template>
