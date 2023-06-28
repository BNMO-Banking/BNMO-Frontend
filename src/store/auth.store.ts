import { defineStore } from "pinia";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import router from "../router/router";
import { type DefaultErrorResponse } from "../types/axios/default-response.type";
import type { DefaultError, DefaultResponse } from "../types/axios/default-response.type";
import type { LoginReqAxios, LoginResAccount, LoginResAxios } from "../types/axios/auth.type";
import { AccountRole } from "../enum/acctype.enum";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            account:
                (JSON.parse(localStorage.getItem("account") || "") as LoginResAccount) ||
                ({} as LoginResAccount),
            accountStatus: "",
            token: localStorage.getItem("token") || "",
            pin_status: false,

            loadingRegister: false,
            errRegister: {} as DefaultErrorResponse,

            loadingLogin: false,
            errLogin: {} as DefaultErrorResponse,

            loadingLogout: false,
            errLogout: {} as DefaultErrorResponse
        };
    },
    getters: {
        isLoadingRegister: (state) => state.loadingRegister,
        errorRegister: (state) => state.errRegister,

        isLoadingLogin: (state) => state.loadingLogin,
        errorLogin: (state) => state.errLogin,

        isLoadingLogout: (state) => state.loadingLogout,
        errorLogout: (state) => state.errLogout
    },
    actions: {
        async postRegister(payload: FormData) {
            this.loadingRegister = true;
            await axios
                .post("/auth/register", payload, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response: AxiosResponse<DefaultResponse>) => {
                    void router.push({ name: "Login" });
                    this.loadingRegister = false;
                    toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errRegister.status = error.response.status;
                            this.errRegister.message = error.response.data.message;
                        }
                        this.loadingRegister = false;
                        return toast.error(this.errRegister.message);
                    }
                });
        },

        async postLogin(payload: LoginReqAxios) {
            this.loadingLogin = true;
            await axios
                .post("/auth/login", payload)
                .then((response: AxiosResponse<LoginResAxios>) => {
                    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                    this.account = response.data.account;
                    this.token = response.data.token;
                    this.pin_status = response.data.pin_status;

                    localStorage.setItem("account", JSON.stringify(response.data.account));
                    localStorage.setItem("token", response.data.token);

                    if (this.account.account_type === AccountRole.ADMIN) {
                        void router.push({ name: "Request Verification" });
                    } else {
                        if (!this.pin_status) {
                            // Move to insert pin page
                        } else {
                            void router.push({ name: "Transfer" });
                        }
                    }

                    this.loadingLogin = false;
                    return toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errLogin.status = error.response.status;
                            this.errLogin.message = error.response.data.message;
                        }
                        this.loadingLogin = false;

                        if (this.errLogin.status === 401) {
                            return toast.warning(this.errLogin.message);
                        } else {
                            return toast.error(this.errLogin.message);
                        }
                    }
                });
        },

        async postLogout() {
            this.loadingLogout = true;
            await axios
                .post("/auth/logout", null)
                .then((response: AxiosResponse<DefaultResponse>) => {
                    this.$reset();
                    localStorage.clear();
                    void router.push({ name: "Landing" });

                    this.loadingLogout = false;
                    toast.success(response.data.message);
                })
                .catch((error: AxiosError<DefaultError>) => {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.data) {
                            this.errLogin.status = error.response.status;
                            this.errLogin.message = error.response.data.message;
                        }
                        this.loadingLogout = false;

                        return toast.error("Logout failed");
                    }
                });
        }
    }
});
