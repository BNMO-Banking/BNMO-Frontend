import { defineStore } from "pinia";
import { fetchPendingAccounts, validateAccount } from "../api/account-verification.api";
import { useToast } from "vue-toastification";
import type RequestAccount from "../types/account-request";
import type PageMetadata from "../types/page-metadata";

const toast = useToast();

export const useAccountVerificationStore = defineStore("account-verification", {
    state: () => ({
        accounts: [] as RequestAccount[],
        metadata: {} as PageMetadata,
        loadingPendingAccounts: false,
        errPendingAccounts: null,

        loadingValidateAccount: false,
        errValidateAccount: null
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
            this.loadingPendingAccounts = true
            return fetchPendingAccounts(page)
                .then((response) => {
                    this.$patch({
                        accounts: response.data,
                        metadata: response.metadata
                    })
                    this.loadingPendingAccounts = false
                })
                .catch((error) => {
                    console.error(error)
                    this.errPendingAccounts = error
                    this.loadingPendingAccounts = false
                })
        },

        async postValidateAccount(payload: Object) {
            this.loadingValidateAccount = true
            return validateAccount(payload)
                .then((response) => {
                    this.loadingValidateAccount = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errValidateAccount = error
                    this.loadingValidateAccount = false
                    toast.error(error.message);
                })
        }
    }
})