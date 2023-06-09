import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DefaultError, DefaultErrorResponse } from "../types/default-response.type";
import { SymbolsResponse } from "../types/currency.type";
import { useToast } from "vue-toastification";

const toast = useToast();

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
                        return toast.error(this.errSymbols.message || "Internal server error");
                    }
                });
        }
    }
});
