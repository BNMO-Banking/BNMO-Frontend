<script setup lang="ts">
import { watch } from "vue";
import { ChartData, ChartOptions } from "chart.js";
import BarChart from "../chart/BarChart.vue";
import { useAdminDashboardStore } from "../../store/admin-dashboard.store";
import { storeToRefs } from "pinia";
import { years } from "../../options/years.options";
import { months } from "../../options/months.options";
import ChartMultiSelectInput from "../form/ChartMultiSelectInput.vue";

const adminDashboardStore = useAdminDashboardStore();
const { bankStatistics, isLoadingBankStatistics } = storeToRefs(adminDashboardStore);
adminDashboardStore.getBankStatistics(years.selected);

const chartOptions = {} as ChartOptions<"bar">;
const chartData = {} as ChartData<"bar">;

const formatMoney = (value: number) => {
    let format = "";
    if (value >= 1000) {
        format = `${value / 1000}K`;
    } else if (value >= 1000000) {
        format = `${value / 1000000}M`;
    } else if (value >= 1000000000) {
        format = `${value / 1000000000}B`;
    }

    return format;
};

const yearUpdated = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    adminDashboardStore.getBankStatistics(parseInt(selected.value));
};

watch(isLoadingBankStatistics, () => {
    chartData.labels = months.lists;
    chartData.datasets = [
        {
            label: "Monthly Expenses",
            backgroundColor: "rgb(255, 69, 69, 0.5)",
            borderColor: "rgb(255, 69, 69)",
            data: bankStatistics.value.monthly_expense.map((item) => {
                return parseInt(item);
            })
        },
        {
            label: "Monthly Income",
            backgroundColor: "rgb(0, 255, 148, 0.4)",
            borderColor: "rgb(0, 255, 148)",
            data: bankStatistics.value.monthly_income.map((item) => {
                return parseInt(item);
            })
        }
    ];

    chartOptions.responsive = true;
    chartOptions.maintainAspectRatio = false;

    chartOptions.scales = {
        y: {
            ticks: {
                callback: (value) => formatMoney(value as number)
            }
        }
    };

    chartOptions.datasets = {
        bar: {
            borderWidth: 2
        }
    };
});
</script>

<template>
    <div
        class="w-full xl:w-3/5 h-full shadow-xl flex flex-col justify-center border border-black p-8 gap-y-4"
    >
        <div class="flex flex-col xl:flex-row items-center justify-between gap-y-2 xl:gap-y-0">
            <h2>BNMO Statistics</h2>
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
            <div class="flex flex-col gap-y-4 w-full lg:w-1/4">
                <div class="flex flex-col gap-y-2">
                    <h3>Yearly Expenses</h3>
                    <hr class="w-full border-t border-black" />
                    <div class="flex gap-x-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#FF4545"
                            class="w-8 h-8"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                        <h4 class="text-main-red">
                            {{
                                parseInt(bankStatistics.total_expense).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "IDR"
                                })
                            }}
                        </h4>
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <h3>Yearly Income</h3>
                    <hr class="w-full border-t border-black" />
                    <div class="flex gap-x-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#00FF94"
                            class="w-8 h-8"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                            />
                        </svg>
                        <h4 class="text-main-green">
                            {{
                                parseInt(bankStatistics.total_income).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "IDR"
                                })
                            }}
                        </h4>
                    </div>
                </div>
            </div>
            <div class="w-fit lg:w-3/4 h-40 lg:h-64">
                <BarChart
                    id="bank_statistics"
                    :is-loading="isLoadingBankStatistics"
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                />
            </div>
        </div>
    </div>
</template>
