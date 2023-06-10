import { defineStore } from "pinia";
import { fetchTransferDestinations, checkDestination, addDestination, transfer } from "../api/transfer.api";
import { useToast } from "vue-toastification";
import TransferDestination from "../types/transfer-destination";

const toast = useToast();

export const useTransferStore = defineStore("transfer", {
    state: () => {
        return {
            destinations: [] as TransferDestination[],
            loadingDestinations: false,
            errDestinations: null,
            
            destName: "",
            loadingCheckDestination: false,
            errCheckDestination: null,

            loadingAddDestination: false,
            errAddDestination: null,

            loadingTransfer: false,
            errTransfer: null,
        };
    },
    getters: {
        transferDestinations: (state) => state.destinations,
        isLoadingDestinations: (state) => state.loadingDestinations,
        errorDestinations: (state) => state.errDestinations,

        destinationName: (state) => state.destName,
        isLoadingCheckDestination: (state) => state.loadingCheckDestination,
        errorCheckDestination: (state) => state.errCheckDestination,

        isLoadingAddDestination: (state) => state.loadingAddDestination,
        errorAddDestination: (state) => state.errAddDestination,

        isLoadingTransfer: (state) => state.loadingTransfer,
        errorTransfer: (state) => state.errTransfer,
    },
    actions: {
        async getTransferDestinations(id: number) {
            this.loadingDestinations = true
            return fetchTransferDestinations(id)
                .then((response) => {
                    this.$patch({
                        destinations: response.destinations
                    })
                })
                .catch((error) => {
                    this.errDestinations = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingDestinations = false
                })
        },

        async postCheckDestination(payload: Object) {
            this.loadingCheckDestination = true
            return checkDestination(payload)
                .then((response) => {
                    this.errCheckDestination = null
                    this.destName = response.name
                })  
                .catch((error) => {
                    this.errCheckDestination = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingCheckDestination = false
                })
        },

        async postAddDestination(payload: Object) {
            this.loadingAddDestination = true
            return addDestination(payload)
                .then((response) => {
                    this.errAddDestination = null
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errAddDestination = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingAddDestination = false
                })
        },

        async postTransfer(payload: Object) {
            this.loadingTransfer = true
            return transfer(payload)
                .then((response) => {
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errTransfer = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingTransfer = false
                })
        }
    },
});
