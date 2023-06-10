import { defineStore } from "pinia";
import { request } from "../api/request.api";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useRequestStore = defineStore("request", {
    state: () => {
        return {
            loadingRequest: false,
            errRequest: null,
        };
    },
    getters: {
        isLoadingRequest: (state) => state.loadingRequest,
        errorRequest: (state) => state.errRequest,
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
        }
    },
});
