import { defineStore } from "pinia";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DefaultError, DefaultErrorResponse } from "../types/default-response.type";
import {
    EditProfileRes,
    ProfileRes,
    ProfileResData,
    ProfileStatistics,
    ProfileStatisticsRes
} from "../types/profile.type";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useProfileStore = defineStore("profile", {
    state: () => {
        return {
            userProfile: {} as ProfileRes,
            loadingProfile: false,
            errProfile: {} as DefaultErrorResponse,

            loadingEdit: false,
            errEdit: {} as DefaultErrorResponse,

            userStatistics: {} as ProfileStatistics,
            loadingStatistics: false,
            errStatistics: {} as DefaultErrorResponse
        };
    },
    getters: {
        profile: (state) => state.userProfile,
        isLoadingProfile: (state) => state.loadingProfile,
        errorProfile: (state) => state.errProfile,

        isLoadingEdit: (state) => state.loadingEdit,
        errorEdit: (state) => state.errEdit,

        statistics: (state) => state.userStatistics,
        isLoadingStatistics: (state) => state.loadingStatistics,
        errorStatistics: (state) => state.errStatistics
    },
    actions: {
        async getProfile(id: string) {
            this.loadingProfile = true;
            await axios
                .get(`/profile/get/${id}`)
                .then((response: AxiosResponse<ProfileResData>) => {
                    this.userProfile = response.data.data;
                    this.loadingProfile = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errProfile.status = error.response.status;
                            this.errProfile.message = error.response.data.error;
                        }
                        this.loadingProfile = false;
                        return toast.error(this.errProfile.message);
                    }
                });
        },

        async editProfile(id: string, payload: FormData) {
            this.loadingEdit = true;
            await axios
                .put(`/profile/edit/${id}`, payload)
                .then((response: AxiosResponse<EditProfileRes>) => {
                    this.userProfile = response.data.data;
                    this.loadingEdit = false;
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errEdit.status = error.response.status;
                            this.errEdit.message = error.response.data.error;
                        }
                        this.loadingEdit = false;
                        return toast.error(this.errEdit.message);
                    }
                });
        },

        async getStatistics(id: string, year: string) {
            this.loadingStatistics = true;
            await axios
                .get(`/profile/statistics/${id}`, {
                    params: {
                        year: year
                    }
                })
                .then((response: AxiosResponse<ProfileStatisticsRes>) => {
                    this.userStatistics = response.data.data;
                    this.loadingStatistics = false;
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errStatistics.status = error.response.status;
                            this.errStatistics.message = error.response.data.error;
                        }
                        this.loadingStatistics = false;
                        return toast.error(this.errStatistics.message);
                    }
                });
        }
    }
});
