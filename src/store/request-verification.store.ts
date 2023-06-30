import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import {
    DefaultError,
    DefaultErrorResponse,
    DefaultResponse
} from "../types/axios/default-response.type";
import { RequestDataList } from "../types/axios/request-verif.type";
import PageMetadata from "../types/model/page-metadata.type";
import RequestData from "../types/model/request-data.type";

const toast = useToast();

export const useRequestVerificationStore = defineStore("request-verification", {
    state: () => ({
        requests: [] as RequestData[],
        pageMetadata: {} as PageMetadata,
        loadingPendingRequests: false,
        errPendingRequests: {} as DefaultErrorResponse,

        loadingValidateRequest: false,
        errValidateRequest: {} as DefaultErrorResponse
    }),
    getters: {
        pendingRequests: (state) => state.requests,
        metadata: (state) => state.pageMetadata,
        isLoadingPendingRequests: (state) => state.loadingPendingRequests,
        errorPendingRequests: (state) => state.errPendingRequests,

        isLoadingValidateRequest: (state) => state.loadingValidateRequest,
        errorValidateRequest: (state) => state.errValidateRequest
    },
    actions: {
        async getPendingRequests(page: number) {
            this.loadingPendingRequests = true;
            await axios
                .get("/request-verif/get", {
                    params: {
                        page: page
                    }
                })
                .then((response: AxiosResponse<RequestDataList>) => {
                    this.$patch({
                        requests: response.data.data,
                        pageMetadata: response.data.metadata
                    });
                    this.loadingPendingRequests = false;
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errPendingRequests.status = error.response.status;
                            this.errPendingRequests.message = error.response.data.error;
                        }
                        this.loadingPendingRequests = false;
                        return toast.error(this.errPendingRequests.message);
                    }
                });
        },

        async postValidateRequest(id: string, status: string) {
            this.loadingValidateRequest = true;
            await axios
                .put(`/request-verif/validate/${id}/${status}`, null)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingValidateRequest = false;
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errValidateRequest.status = error.response.status;
                            this.errValidateRequest.message = error.response.data.error;
                        }
                        this.loadingValidateRequest = false;
                        return toast.error(this.errValidateRequest.message);
                    }
                });
        }
    }
});
