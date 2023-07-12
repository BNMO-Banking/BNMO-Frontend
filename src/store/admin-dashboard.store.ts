import { defineStore } from "pinia";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import { DefaultError, type DefaultErrorResponse } from "../types/default-response.type";
import {
    BankStatistics,
    BankStatisticsRes,
    NewAccountStatistics,
    NewAccountStatisticsRes,
    PendingAccountList,
    PendingList,
    PendingRequestList,
    RequestTypeStatistics
} from "../types/admin-dashboard.type";

const toast = useToast();

export const useAdminDashboardStore = defineStore("admin-dashboard", {
    state: () => {
        return {
            accounts: {} as PendingAccountList,
            requests: {} as PendingRequestList,
            loadingPendings: false,
            errPendings: {} as DefaultErrorResponse,

            newAccounts: {} as NewAccountStatistics,
            loadingNewAccounts: false,
            errNewAccounts: {} as DefaultErrorResponse,

            adds: 0,
            subtracts: 0,
            loadingRequestTypes: false,
            errRequestTypes: {} as DefaultErrorResponse,

            statistics: {} as BankStatistics,
            loadingBankStatistics: false,
            errBankStatistics: {} as DefaultErrorResponse
        };
    },
    getters: {
        pendingAccounts: (state) => state.accounts,
        pendingRequests: (state) => state.requests,
        isLoadingPendings: (state) => state.loadingPendings,
        errorPendings: (state) => state.errPendings,

        accountStatistics: (state) => state.newAccounts,
        isLoadingAccountStatistics: (state) => state.loadingNewAccounts,
        errorAccountStatistics: (state) => state.errNewAccounts,

        addRequests: (state) => state.adds,
        subtractRequests: (state) => state.subtracts,
        isLoadingRequestStatistics: (state) => state.loadingRequestTypes,
        errorRequestStatistics: (state) => state.errRequestTypes,

        bankStatistics: (state) => state.statistics,
        isLoadingBankStatistics: (state) => state.loadingBankStatistics,
        errorBankStatistics: (state) => state.errBankStatistics
    },
    actions: {
        async getPendingLists() {
            this.loadingPendings = true;
            await axios
                .get("/admin-dashboard/get-pending-list")
                .then((response: AxiosResponse<PendingList>) => {
                    this.loadingPendings = false;
                    this.accounts = response.data.accounts;
                    this.requests = response.data.requests;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errPendings.status = error.response.status;
                            this.errPendings.message = error.response.data.error;
                        }
                        this.loadingPendings = false;
                        return toast.error(this.errPendings.message || "Internal server error");
                    }
                });
        },

        async getNewAccountStatistics(year: number) {
            this.loadingNewAccounts = true;
            await axios
                .get("/admin-dashboard/get-account-statistics", {
                    params: {
                        year: year
                    }
                })
                .then((response: AxiosResponse<NewAccountStatisticsRes>) => {
                    this.loadingNewAccounts = false;
                    this.newAccounts = response.data.data;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errNewAccounts.status = error.response.status;
                            this.errNewAccounts.message = error.response.data.error;
                        }
                        this.loadingNewAccounts = false;
                        return toast.error(this.errNewAccounts.message || "Internal server error");
                    }
                });
        },

        async getRequestTypeStatistics(year: number, month = "") {
            this.loadingRequestTypes = true;
            await axios
                .get("/admin-dashboard/get-request-statistics", {
                    params: {
                        month: month,
                        year: year
                    }
                })
                .then((response: AxiosResponse<RequestTypeStatistics>) => {
                    this.loadingRequestTypes = false;
                    this.adds = response.data.add;
                    this.subtracts = response.data.subtract;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errRequestTypes.status = error.response.status;
                            this.errRequestTypes.message = error.response.data.error;
                        }
                        this.loadingRequestTypes = false;
                        return toast.error(this.errRequestTypes.message || "Internal server error");
                    }
                });
        },

        async getBankStatistics(year: number) {
            this.loadingBankStatistics = true;
            await axios
                .get("/admin-dashboard/get-bank-statistics", {
                    params: {
                        year: year
                    }
                })
                .then((response: AxiosResponse<BankStatisticsRes>) => {
                    this.loadingBankStatistics = false;
                    this.statistics = response.data.data;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errBankStatistics.status = error.response.status;
                            this.errBankStatistics.message = error.response.data.error;
                        }
                        this.loadingBankStatistics = false;
                        return toast.error(
                            this.errBankStatistics.message || "Internal server error"
                        );
                    }
                });
        }
    }
});
