import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import type {
    CheckDestinationRes,
    DestinationRes,
    DestinationResList,
    AddDestinationReq
} from "../types/associates.type";
import { TransferReqAxios } from "../types/transfer.type";
import {
    DefaultError,
    DefaultErrorResponse,
    DefaultResponse
} from "../types/default-response.type";
import axios, { AxiosError, AxiosResponse } from "axios";

const toast = useToast();

export const useTransferStore = defineStore("transfer", {
    state: () => {
        return {
            destinations: [] as DestinationRes[],
            loadingDestinations: false,
            errDestinations: {} as DefaultErrorResponse,

            destName: "",
            loadingCheckDestination: false,
            errCheckDestination: {} as DefaultErrorResponse,

            loadingAddDestination: false,
            errAddDestination: {} as DefaultErrorResponse,

            loadingTransfer: false,
            errTransfer: {} as DefaultErrorResponse
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
        errorTransfer: (state) => state.errTransfer
    },
    actions: {
        async getDestinationList(id: string) {
            this.loadingDestinations = true;
            await axios
                .get("/associates/get", {
                    params: {
                        id: id
                    }
                })
                .then((response: AxiosResponse<DestinationResList>) => {
                    this.$patch({
                        destinations: response.data.data
                    });
                    this.loadingDestinations = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errDestinations.status = error.response.status;
                            this.errDestinations.message = error.response.data.error;
                        }
                        this.loadingDestinations = false;
                        return toast.error(this.errDestinations.message);
                    }
                });
        },

        async getCheckDestination(account_number: string) {
            this.loadingCheckDestination = true;
            await axios
                .get(`/associates/check/${account_number}`)
                .then((response: AxiosResponse<CheckDestinationRes>) => {
                    this.$patch({
                        destName: response.data.name
                    });
                    this.loadingCheckDestination = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errCheckDestination.status = error.response.status;
                            this.errCheckDestination.message = error.response.data.error;
                        }
                        this.loadingCheckDestination = false;
                        return toast.error(this.errCheckDestination.message);
                    }
                });
        },

        async postAddDestination(payload: AddDestinationReq) {
            this.loadingAddDestination = true;
            await axios
                .post("/associates/add", payload)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingAddDestination = false;
                    toast.success(response.data.message);
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errAddDestination.status = error.response.status;
                            this.errAddDestination.message = error.response.data.error;
                        }
                        this.loadingAddDestination = false;
                        return toast.error(this.errAddDestination.message);
                    }
                });
        },

        async postTransfer(payload: TransferReqAxios) {
            this.loadingTransfer = true;
            await axios
                .post("/transfer/send", payload)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingTransfer = false;
                    toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errTransfer.status = error.response.status;
                            this.errTransfer.message = error.response.data.error;
                        }
                        this.loadingTransfer = false;
                        return toast.error(this.errTransfer.message);
                    }
                });
        }
    }
});
