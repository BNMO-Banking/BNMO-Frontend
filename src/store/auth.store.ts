import { defineStore } from "pinia";
import { register, login, logout } from "../api/auth.api";
import { useToast } from "vue-toastification";
import Account from "../types/account-type";
import router from "../router/router";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            account: JSON.parse(localStorage.getItem("account")!) as Account || {} as Account,
            accountStatus: "",
            token: localStorage.getItem("token") || "",

            loadingRegister: false,
            errRegister: null,

            loadingLogin: false,
            errLogin: null,

            loadingLogout: false,
            errLogout: null
        };
    },
    getters: {
        isLoadingRegister: (state) => state.loadingRegister,
        errorRegister: (state) => state.errRegister,

        isLoadingLogin: (state) => state.loadingLogin,
        errorLogin: (state) => state.errLogin,

        isLoadingLogout: (state) => state.loadingLogout,
        errorLogout: (state) => state.errLogout,
    },
    actions: {
        async postRegister(payload: FormData) {
            this.loadingRegister = true
            return register(payload)
                .then((response) => {
                    router.push({ name: "Login" })

                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errRegister = error
                    toast.error(error.message);
                })
                .finally(() => {
                    this.loadingRegister = false
                })
        },

        async postLogin(payload: Object) {
            this.loadingLogin = true
            return login(payload)
                .then((response) => {
                    this.account = response.account
                    this.accountStatus = response.accountStatus
                    this.token = response.token

                    localStorage.setItem("account", JSON.stringify(response.account))
                    localStorage.setItem("token", response.token)

                    if (this.account.is_admin) {
                        router.push({ name: "Request Verification" });
                    } else {
                        router.push({ name: "Transfer"});
                    }

                    toast.success(response.message);
                })
                .catch((error) => {
                    if (error.status) {
                        if (error.status === 401) {
                            toast.warning(error.message);
                        } else {
                            toast.error(error.message);
                        }
                    } else {
                        this.errLogin = error
                    }
                })
                .finally(() => {
                    this.loadingLogin = false
                })
        },

        async postLogout() {
            this.loadingLogout = true
            return logout()
                .then((response) => {
                    this.$reset()
                    localStorage.clear()
                    router.push({ name: "Landing" })

                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errLogout = error
                    toast.error("Failed to logout: Internal server error");
                })
                .finally(() => {
                    this.loadingLogout = false
                })
        },
    },
});
