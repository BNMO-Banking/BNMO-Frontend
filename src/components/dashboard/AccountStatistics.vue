<script setup lang="ts">
import { watch } from "vue";
import { ChartData, ChartOptions } from "chart.js";
import { useAdminDashboardStore } from "../../store/admin-dashboard.store";
import { storeToRefs } from "pinia";
import { years } from "../../options/years.options";
import { months } from "../../options/months.options";
import ChartMultiSelectInput from "../form/ChartMultiSelectInput.vue";
import AreaChart from "../chart/AreaChart.vue";

const adminDashboardStore = useAdminDashboardStore();
const { accountStatistics, isLoadingAccountStatistics } = storeToRefs(adminDashboardStore);
adminDashboardStore.getNewAccountStatistics(years.selected);

const chartOptions = {} as ChartOptions<"line">;
const chartData = {} as ChartData<"line">;

const yearUpdated = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    adminDashboardStore.getNewAccountStatistics(parseInt(selected.value));
};

watch(isLoadingAccountStatistics, () => {
    chartData.labels = months.lists;
    chartData.datasets = [
        {
            label: "Monthly New Accounts",
            backgroundColor: "rgb(0, 255, 255, 0.5)",
            borderColor: "rgb(0, 255, 255)",
            fill: true,
            data: accountStatistics.value.monthly_accounts
        }
    ];

    chartOptions.responsive = true;
    chartOptions.maintainAspectRatio = false;
    chartOptions.scales = {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    };
});
</script>

<template>
    <div
        class="w-full xl:w-3/5 h-full shadow-xl flex flex-col justify-center border border-black p-8 gap-y-4"
    >
        <div class="flex flex-col xl:flex-row items-center justify-between gap-y-2 xl:gap-y-0">
            <h3>New Account Statistics</h3>
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
        <div class="flex flex-col gap-y-2 xl:gap-y-0">
            <div class="flex w-full gap-x-2">
                <h5>Total accounts registered on BNMO</h5>
                <p>:</p>
                <p>{{ accountStatistics.total_accounts }}</p>
            </div>
            <div class="flex w-full gap-x-2">
                <h5>New accounts registered on BNMO this year ({{ new Date().getFullYear() }})</h5>
                <p>:</p>
                <p>{{ accountStatistics.yearly_accounts }}</p>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row w-full items-center gap-x-4 gap-y-4 lg:gap-y-0">
            <div class="w-full h-40 lg:h-64">
                <AreaChart
                    id="account_statistics"
                    :is-loading="isLoadingAccountStatistics"
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                />
            </div>
        </div>
    </div>
</template>
