import { defineStore } from "pinia";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import type { RequestReqAxios } from "../types/axios/request.type";
import {
    DefaultError,
    DefaultErrorResponse,
    DefaultResponse
} from "../types/axios/default-response.type";

const toast = useToast();

export const useRequestStore = defineStore("request", {
    state: () => {
        return {
            loadingRequest: false,
            errRequest: {} as DefaultErrorResponse
        };
    },
    getters: {
        isLoadingRequest: (state) => state.loadingRequest,
        errorRequest: (state) => state.errRequest
    },
    actions: {
        async postRequest(payload: RequestReqAxios) {
            this.loadingRequest = true;
            await axios
                .post("/request/add", payload)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.loadingRequest = false;
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errRequest.status = error.response.status;
                            this.errRequest.message = error.response.data.error;
                        }
                        this.loadingRequest = false;
                        return toast.error(this.errRequest.message);
                    }
                });
        }
    }
});
