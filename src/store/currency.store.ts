import { defineStore } from "pinia";
import { fetchSymbols } from "../api/currency.api"

export const useSymbolStore = defineStore("store", {
    state: () => {
        return {
            symbols: {},
            isLoadingSymbols: false,
            errorSymbols: null
        };
    },
    getters: {
        symbols: (state) => state.symbols,
        isLoadingSymbols: (state) => state.isLoadingSymbols,
        errorSymbols: (state) => state.errorSymbols
    },
    actions: {
        async getSymbols() {
            this.isLoadingSymbols = true
            return fetchSymbols()
                .then((response) => {
                    this.$patch({
                        symbols: response.symbols
                    })
                })
                .catch((error) => {
                    console.error(error);
                    this.errorSymbols = error
                })
                .finally(() => {
                    this.isLoadingSymbols = false
                })
        }
    },
});
