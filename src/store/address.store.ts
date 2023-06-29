import { defineStore } from "pinia";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import { type DefaultErrorResponse } from "../types/axios/default-response.type";
import { ProvincesData, RegenciesData } from "../types/axios/address.type";

const toast = useToast();
const addressAxios = axios.create({
    baseURL: "https://www.emsifa.com/api-wilayah-indonesia/api",
    headers: {
        Authorization: null
    }
});

export const useAddressStore = defineStore("address", {
    state: () => {
        return {
            provincesList: [] as ProvincesData[],
            loadingProvinces: false,
            errProvinces: {} as DefaultErrorResponse,

            regenciesList: [] as RegenciesData[],
            loadingRegencies: false,
            errRegencies: {} as DefaultErrorResponse
        };
    },
    getters: {
        provinces: (state) => state.provincesList,
        isLoadingProvinces: (state) => state.loadingProvinces,
        errorProvinces: (state) => state.errProvinces,

        regencies: (state) => state.regenciesList,
        isLoadingRegencies: (state) => state.loadingRegencies,
        errorRegencies: (state) => state.errRegencies
    },
    actions: {
        async getProvinces() {
            this.loadingProvinces = true;
            await addressAxios
                .get("/provinces.json")
                .then((response: AxiosResponse) => {
                    this.loadingProvinces = false;
                    this.provincesList = response.data;
                })
                .catch((error: AxiosError) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errProvinces.status = error.response.status;
                        }
                        this.loadingProvinces = false;
                        return toast.error("Error fetching provinces");
                    }
                });
        },

        async getRegencies(id: string) {
            this.loadingRegencies = true;
            await addressAxios
                .get(`/regencies/${id}.json`)
                .then((response: AxiosResponse) => {
                    this.loadingRegencies = false;
                    this.regenciesList = response.data;
                })
                .catch((error: AxiosError) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errProvinces.status = error.response.status;
                        }
                        this.loadingRegencies = false;
                        return toast.error("Error fetching regencies");
                    }
                });
        }
    }
});
