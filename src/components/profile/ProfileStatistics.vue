<script setup lang="ts">
import { watch } from "vue";
import BarChart from "../chart/BarChart.vue";
import { ChartData, ChartOptions } from "chart.js";
import { months } from "../../options/months.options";
import { useAuthStore } from "../../store/auth.store";
import { useProfileStore } from "../../store/profile.store";
import { storeToRefs } from "pinia";
import ChartMultiSelectInput from "../form/ChartMultiSelectInput.vue";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { account } = storeToRefs(authStore);
const { statistics, isLoadingStatistics } = storeToRefs(profileStore);
profileStore.getStatistics(account.value.id, "2023");

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
    profileStore.getStatistics(account.value.id, selected.value);
};

watch(isLoadingStatistics, () => {
    chartData.labels = months.lists;
    chartData.datasets = [
        {
            label: "Monthly Expenses",
            backgroundColor: "rgb(255, 69, 69, 0.5)",
            borderColor: "rgb(255, 69, 69)",
            data: statistics.value.monthly_spending.map((item) => {
                return parseInt(item);
            })
        },
        {
            label: "Monthly Income",
            backgroundColor: "rgb(0, 255, 148, 0.4)",
            borderColor: "rgb(0, 255, 148)",
            data: statistics.value.monthly_received.map((item) => {
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
    <div class="w-full shadow-xl flex flex-col border border-black p-8 gap-y-4">
        <div class="flex flex-col xl:flex-row items-center justify-between gap-y-2 xl:gap-y-0">
            <h2>Your statistics</h2>
            <ChartMultiSelectInput id="year" label="Year" @select-event="yearUpdated">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <!-- <option v-for="data in provinces" :key="data.id" :value="data.id">
                    {{ data.name }}
                </option> -->
            </ChartMultiSelectInput>
        </div>
        <div class="flex flex-col lg:flex-row w-full items-center gap-x-4 gap-y-4 lg:gap-y-0">
            <div class="flex flex-col gap-y-4 w-full lg:w-1/4">
                <div class="flex flex-col gap-y-2">
                    <h3>Balance</h3>
                    <hr class="w-full border-t border-black" />
                    <h4>
                        {{
                            parseInt(statistics.balance).toLocaleString("en-US", {
                                style: "currency",
                                currency: "IDR"
                            })
                        }}
                    </h4>
                </div>
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
                                parseInt(statistics.total_spent).toLocaleString("en-US", {
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
                                parseInt(statistics.total_received).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "IDR"
                                })
                            }}
                        </h4>
                    </div>
                </div>
            </div>
            <div class="w-fit lg:w-3/4 h-60 lg:h-96">
                <BarChart
                    id="statistics"
                    :is-loading="isLoadingStatistics"
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                />
            </div>
        </div>
    </div>
</template>
