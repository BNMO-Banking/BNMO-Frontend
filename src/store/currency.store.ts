import { defineStore } from "pinia";
import { fetchSymbols } from "../api/currency.api"

export const useSymbolStore = defineStore("store", {
    state: () => {
        return {
            symbols: {},
            loadingSymbols: false,
            errSymbols: null
        };
    },
    getters: {
        symbols: (state) => state.symbols,
        isLoadingSymbols: (state) => state.loadingSymbols,
        errorSymbols: (state) => state.errSymbols
    },
    actions: {
        async getSymbols() {
            this.loadingSymbols = true
            return fetchSymbols()
                .then((response) => {
                    this.$patch({
                        symbols: response.symbols
                    })
                })
                .catch((error) => {
                    console.error(error);
                    this.errSymbols = error
                })
                .finally(() => {
                    this.loadingSymbols = false
                })
        }
    },
});
