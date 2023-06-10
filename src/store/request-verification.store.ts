import { defineStore } from "pinia";
import { fetchPendingRequests, validateRequest } from "../api/request-verification.api";
import { useToast } from "vue-toastification";
import RequestMoney from "../types/money-request";
import PageMetadata from "../types/page-metadata";

const toast = useToast();

export const useRequestVerificationStore = defineStore("request-verification", {
    state: () => ({
        requests: [] as RequestMoney[],
        metadata: {} as PageMetadata,
        loadingPendingRequests: false,
        errPendingRequests: null,

        loadingValidateRequest: false,
        errValidateRequest: null
    }),
    getters: {
        pendingRequests: (state) => state.requests,
        pageMetadata: (state) => state.metadata,
        isLoadingPendingRequests: (state) => state.loadingPendingRequests,
        errorPendingRequests: (state) => state.errPendingRequests,

        isLoadingValidateRequest: (state) => state.loadingValidateRequest,
        errorValidateRequest: (state) => state.errValidateRequest
    },
    actions: {
        async getPendingRequests(page: number) {
            this.loadingPendingRequests = true
            return fetchPendingRequests(page)
                .then((response) => {
                    this.$patch({
                        requests: response.data,
                        metadata: response.metadata
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.errPendingRequests = error
                })
                .finally(() => {
                    this.loadingPendingRequests = false
                })
        },

        async postValidateRequest(payload: Object) {
            this.loadingValidateRequest = true
            return validateRequest(payload)
                .then((response) => {
                    toast.success(response.data.message);
                })
                .catch((error) => {
                    this.errValidateRequest = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingValidateRequest = false
                })
        }
    }
})