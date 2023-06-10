import { defineStore } from "pinia";
import { fetchSymbols, fetchBalance } from "../api/currency.api"
import { useAuthStore } from "./auth.store";

export const useCurrencyStore = defineStore("store", {
    state: () => {
        return {
            currencySymbols: {},
            loadingSymbols: false,
            errSymbols: null,

            loadingBalance: false,
            errBalance: null
        };
    },
    getters: {
        symbols: (state) => state.currencySymbols,
        isLoadingSymbols: (state) => state.loadingSymbols,
        errorSymbols: (state) => state.errSymbols,

        isLoadingBalance: (state) => state.loadingBalance,
        errorBalance: (state) => state.errBalance
    },
    actions: {
        async getSymbols() {
            this.loadingSymbols = true
            return fetchSymbols()
                .then((response) => {
                    this.$patch({
                        currencySymbols: response.symbols
                    })
                    this.loadingSymbols = false
                })
                .catch((error) => {
                    console.error(error);
                    this.errSymbols = error
                    this.loadingSymbols = false
                })
        },

        async getUpdatedBalance(id: number) {
            this.loadingBalance = true
            return fetchBalance(id)
                .then((response) => {
                    const authStore = useAuthStore()
                    authStore.account.balance = response.balance
                    this.loadingBalance = false
                })
                .catch((error) => {
                    console.error(error)
                    this.errBalance = error
                    this.loadingBalance = false  
                })
        }
    },
});
