import { defineStore } from "pinia";
import { register, login, logout, checkPin, changePin, changePassword } from "../api/auth.api";
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
            errLogout: null,

            pinSet: false,
            loadingCheckPin: false,
            errCheckPin: null,

            loadingChangePin: false,
            errChangePin: null,

            loadingChangePassword: false,
            errChangePassword: null,
        };
    },
    getters: {
        isLoadingRegister: (state) => state.loadingRegister,
        errorRegister: (state) => state.errRegister,

        isLoadingLogin: (state) => state.loadingLogin,
        errorLogin: (state) => state.errLogin,

        isLoadingLogout: (state) => state.loadingLogout,
        errorLogout: (state) => state.errLogout,

        checkPinSet: (state) => state.pinSet,
        isLoadingCheckPin: (state) => state.loadingCheckPin,
        errorCheckPin: (state) => state.errCheckPin,

        isLoadingChangePin: (state) => state.loadingChangePin,
        errorChangePin: (state) => state.errChangePin,

        isLoadingChangePassword: (state) => state.loadingChangePassword,
        errorChangePassword: (state) => state.errChangePassword,
    },
    actions: {
        async postRegister(payload: FormData) {
            this.loadingRegister = true
            return register(payload)
                .then((response) => {
                    router.push({ name: "Login" })
                    
                    this.loadingRegister = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errRegister = error
                    this.loadingRegister = false
                    toast.error(error.message);
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

                    this.loadingLogin = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.loadingLogin = false
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
        },

        async postLogout() {
            this.loadingLogout = true
            return logout()
                .then((response) => {
                    this.$reset()
                    localStorage.clear()
                    router.push({ name: "Landing" })

                    this.loadingLogout = false
                    toast.success(response.message);
                })
                .catch((error) => {
                    this.errLogout = error
                    this.loadingLogout = false
                    toast.error("Failed to logout: Internal server error");
                })
        },

        async getCheckPin(id: number) {
            this.loadingCheckPin = true
            return checkPin(id)
                .then((response) => {
                    this.pinSet = response.pin_set
                    this.loadingCheckPin = false
                })
                .catch((error) => {
                    console.error(error)
                    this.errCheckPin = error
                    this.loadingCheckPin = false
                })
        },

        async putChangePin(payload: Object) {
            this.loadingChangePin = true
            return changePin(payload)
                .then((response) => {
                    this.pinSet = response.pin_set
                    this.loadingCheckPin = false
                })
                .catch((error) => {
                    console.error(error)
                    this.errCheckPin = error
                    this.loadingCheckPin = false
                })
        }
    },
});
