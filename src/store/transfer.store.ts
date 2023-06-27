import { defineStore } from "pinia";
import { 
    fetchTransferDestinations, 
    checkDestination, 
    addDestination, 
    transfer, 
    fetchTransferHistory } from "../api/transfer.api";
import { useToast } from "vue-toastification";
import type TransferDestination from "../types/transfer-destination";
import type TransferHistory from "../types/transfer-history";
import type PageMetadata from "../types/page-metadata";

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

            histories: [] as TransferHistory[],
            metadata: {} as PageMetadata,
            loadingHistories: false,
            errHistories: null
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

        transferHistories: (state) => state.histories,
        pageMetadata: (state) => state.metadata,
        isLoadingTransferHistories: (state) => state.loadingHistories,
        errorTransferHistories: (state) => state.errHistories
    },
    actions: {
        async getTransferDestinations(id: number) {
            this.loadingDestinations = true
            return fetchTransferDestinations(id)
                .then((response) => {
                    this.$patch({
                        destinations: response.destinations
                    })
                    this.loadingDestinations = false
                })
                .catch((error) => {
                    this.errDestinations = error
                    this.loadingDestinations = false
                    toast.error(error.message);
                })
        },

        async postCheckDestination(payload: Object) {
            this.loadingCheckDestination = true
            return checkDestination(payload)
                .then((response) => {
                    this.errCheckDestination = null
                    this.destName = response.name
                    this.loadingCheckDestination = false
                })  
                .catch((error) => {
                    this.errCheckDestination = error
                    toast.error(error.message);
                    this.loadingCheckDestination = false
                })
        },

        async postAddDestination(payload: Object) {
            this.loadingAddDestination = true
            return addDestination(payload)
                .then((response) => {
                    this.errAddDestination = null
                    this.loadingAddDestination = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errAddDestination = error
                    this.loadingAddDestination = false
                    toast.error(error.message);
                })
        },

        async postTransfer(payload: Object) {
            this.loadingTransfer = true
            return transfer(payload)
                .then((response) => {
                    this.loadingTransfer = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errTransfer = error
                    this.loadingTransfer = false
                    toast.error(error.message);
                })
        },

        async getTransferHistories(id: number, page: number) {
            this.loadingHistories = true
            return fetchTransferHistory(id, page)
                .then((response) => {
                    this.$patch({
                        histories: response.data,
                        metadata: response.metadata
                    })
                    this.loadingHistories = false
                })
                .catch((error) => {
                    console.error(error)
                    this.errHistories = error
                    this.loadingHistories = false
                })
        }
    },
});
