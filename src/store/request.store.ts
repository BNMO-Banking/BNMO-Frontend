import { defineStore } from "pinia";
import { request, fetchRequestHistory } from "../api/request.api";
import { useToast } from "vue-toastification";
import RequestHistory from "../types/request-history";
import PageMetadata from "../types/page-metadata";

const toast = useToast();

export const useRequestStore = defineStore("request", {
    state: () => {
        return {
            loadingRequest: false,
            errRequest: null,

            histories: [] as RequestHistory[],
            metadata: {} as PageMetadata,
            loadingHistories: false,
            errHistories: null
        };
    },
    getters: {
        isLoadingRequest: (state) => state.loadingRequest,
        errorRequest: (state) => state.errRequest,

        requestHistories: (state) => state.histories,
        pageMetadata: (state) => state.metadata,
        isLoadingRequestHistories: (state) => state.loadingHistories,
        errorRequestHistories: (state) => state.errHistories
},
    actions: {
        async postRequest(payload: Object) {
            this.loadingRequest = true
            return request(payload)
                .then((response) => {
                    this.loadingRequest = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errRequest = error
                    this.loadingRequest = false
                    toast.error(error.message);
                })
        },

        async getRequestHistories(id: number, page: number) {
            this.loadingHistories = true
            return fetchRequestHistory(id, page)
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
