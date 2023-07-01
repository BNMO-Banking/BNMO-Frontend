import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import {
    DefaultError,
    DefaultErrorResponse,
    DefaultResponse
} from "../types/default-response.type";
import type PageMetadata from "../types/page-metadata.type";
import AccountData, { AccountDataList } from "../types/account-verif.type";
import router from "../router/router";

const toast = useToast();

export const useAccountVerificationStore = defineStore("account-verification", {
    state: () => ({
        accounts: [] as AccountData[],
        metadata: {} as PageMetadata,
        loadingPendingAccounts: false,
        errPendingAccounts: {} as DefaultErrorResponse,

        loadingValidateAccount: false,
        errValidateAccount: {} as DefaultErrorResponse
    }),
    getters: {
        pendingAccounts: (state) => state.accounts,
        pageMetadata: (state) => state.metadata,
        isLoadingPendingAccounts: (state) => state.loadingPendingAccounts,
        errorPendingAccounts: (state) => state.errPendingAccounts,

        isLoadingValidateAccount: (state) => state.loadingValidateAccount,
        errorValidateAccount: (state) => state.errValidateAccount
    },
    actions: {
        async getPendingAccounts(page: number) {
            this.loadingPendingAccounts = true;
            await axios
                .get("/account-verif/get", {
                    params: {
                        page: page
                    }
                })
                .then((response: AxiosResponse<AccountDataList>) => {
                    this.$patch({
                        accounts: response.data.data,
                        metadata: response.data.metadata
                    });
                    this.loadingPendingAccounts = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errPendingAccounts.status = error.response.status;
                            this.errPendingAccounts.message = error.response.data.error;
                        }
                        this.loadingPendingAccounts = false;
                        return toast.error(this.errPendingAccounts.message);
                    }
                });
        },

        async postValidateAccount(id: string, status: string) {
            this.loadingValidateAccount = true;
            await axios
                .put(`/account-verif/validate/${id}/${status}`)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingValidateAccount = false;
                    if (router.currentRoute.value.query.page !== null) {
                        this.getPendingAccounts(
                            parseInt(router.currentRoute.value.query.page.toString())
                        );
                    }
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errValidateAccount.status = error.response.status;
                            this.errValidateAccount.message = error.response.data.error;
                        }
                        this.loadingValidateAccount = false;
                        return toast.error(this.errValidateAccount.message);
                    }
                });
        }
    }
});
