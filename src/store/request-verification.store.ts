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
    }),
    getters: {
        pendingRequests: (state) => state.requests,
        pageMetadata: (state) => state.metadata,
        isLoadingPendingRequests: (state) => state.loadingPendingRequests,
        errorPendingRequests: (state) => state.errPendingRequests
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

        async validateRequest(payload: Object) {
            return validateRequest(payload)
                .then((response) => {
                    toast.success(response.data.message, {
                        timeout: 5000,
                    });
                })
                .catch((error) => {
                    toast.error(error.message, {
                        timeout: 5000,
                    });
                })
        }
    }
})