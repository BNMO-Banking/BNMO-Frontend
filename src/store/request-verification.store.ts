import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import {
    DefaultError,
    DefaultErrorResponse,
    DefaultResponse
} from "../types/default-response.type";
import RequestData, { RejectRemarksReq, RequestDataList } from "../types/request-verif.type";
import PageMetadata from "../types/page-metadata.type";
import { Status } from "../enum/status.enum";
import router from "../router/router";

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
                        return toast.error(
                            this.errPendingRequests.message || "Internal server error"
                        );
                    }
                });
        },

        async postValidateRequest(id: string, status: string, remarks: RejectRemarksReq) {
            this.loadingValidateRequest = true;
            await axios
                .put(
                    `/request-verif/validate/${id}/${status}`,
                    status === Status.ACCEPTED ? null : remarks
                )
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingValidateRequest = false;
                    if (router.currentRoute.value.query.page !== null) {
                        this.getPendingRequests(
                            parseInt(router.currentRoute.value.query.page.toString())
                        );
                    }
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errValidateRequest.status = error.response.status;
                            this.errValidateRequest.message = error.response.data.error;
                        }
                        this.loadingValidateRequest = false;
                        return toast.error(
                            this.errValidateRequest.message || "Internal server error"
                        );
                    }
                });
        }
    }
});
