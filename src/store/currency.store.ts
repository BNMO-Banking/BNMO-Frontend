import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DefaultError, DefaultErrorResponse } from "../types/axios/default-response.type";
import { SymbolsResponse } from "../types/axios/currency.type";

export const useCurrencyStore = defineStore("store", {
    state: () => {
        return {
            currencySymbols: {} as SymbolsResponse,
            loadingSymbols: false,
            errSymbols: {} as DefaultErrorResponse
        };
    },
    getters: {
        symbols: (state) => state.currencySymbols,
        isLoadingSymbols: (state) => state.loadingSymbols,
        errorSymbols: (state) => state.errSymbols
    },
    actions: {
        async getSymbols() {
            this.loadingSymbols = true;
            axios
                .get("/currency/get-symbols")
                .then((response: AxiosResponse<SymbolsResponse>) => {
                    this.$patch({
                        currencySymbols: response.data.symbols
                    });
                    this.loadingSymbols = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errSymbols.status = error.response.status;
                            this.errSymbols.message = error.response.data.error;
                        }
                        this.loadingSymbols = false;
                    }
                });
        }
    }
});
