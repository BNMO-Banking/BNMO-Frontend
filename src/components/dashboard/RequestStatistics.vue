<script setup lang="ts">
import { ref, watch } from "vue";
import { ChartData, ChartOptions } from "chart.js";
import DoughnutChart from "../chart/DoughnutChart.vue";
import { useAdminDashboardStore } from "../../store/admin-dashboard.store";
import { storeToRefs } from "pinia";
import ChartMultiSelectInput from "../form/ChartMultiSelectInput.vue";
import { years } from "../../options/years.options";
import { months } from "../../options/months.options";

const adminDashboardStore = useAdminDashboardStore();
const { addRequests, subtractRequests, isLoadingRequestStatistics } =
    storeToRefs(adminDashboardStore);
adminDashboardStore.getRequestTypeStatistics(years.selected, months.selected || "");

const chartOptions = {} as ChartOptions<"doughnut">;
const chartData = {} as ChartData<"doughnut">;
const monthRef = ref(months.selected);
const yearRef = ref(years.selected);

const monthUpdated = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    monthRef.value = selected.value === "All" ? "" : selected.value;
    adminDashboardStore.getRequestTypeStatistics(yearRef.value, monthRef.value);
};

const yearUpdated = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    yearRef.value = parseInt(selected.value);
    adminDashboardStore.getRequestTypeStatistics(yearRef.value, monthRef.value);
};

watch(isLoadingRequestStatistics, () => {
    chartData.labels = ["Add", "Subtract"];
    chartData.datasets = [
        {
            label: "Request",
            backgroundColor: ["rgb(0, 255, 148, 0.4)", "rgb(255, 69, 69, 0.5)"],
            borderColor: ["rgb(0, 255, 148)", "rgb(255, 69, 69)"],
            data: [addRequests.value, subtractRequests.value]
        }
    ];

    chartOptions.responsive = true;
    chartOptions.maintainAspectRatio = false;
});
</script>

<template>
    <div
        class="w-2/5 h-full shadow-xl flex flex-col justify-center border border-black p-8 gap-y-4"
    >
        <h3>Request Statistics</h3>
        <div class="flex items-center justify-between gap-x-2">
            <ChartMultiSelectInput id="month" label="Month" @select-event="monthUpdated">
                <option
                    v-for="month in months.multiselectLists"
                    :key="month"
                    :value="month"
                    :selected="month === months.selected"
                >
                    {{ month }}
                </option>
            </ChartMultiSelectInput>
            <ChartMultiSelectInput id="year" label="Year" @select-event="yearUpdated">
                <option
                    v-for="year in years.lists"
                    :key="year"
                    :value="year"
                    :selected="year === years.selected"
                >
                    {{ year }}
                </option>
            </ChartMultiSelectInput>
        </div>
        <div class="flex flex-col lg:flex-row w-full items-center gap-x-4 gap-y-4 lg:gap-y-0">
            <div class="flex w-full h-40 lg:h-64 items-center justify-center">
                <DoughnutChart
                    v-if="addRequests > 0 && subtractRequests > 0"
                    id="request_statistics"
                    :is-loading="isLoadingRequestStatistics"
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                />
                <h4 v-else>No requests yet</h4>
            </div>
        </div>
    </div>
</template>
