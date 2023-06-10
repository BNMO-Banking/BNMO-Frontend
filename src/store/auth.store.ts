import { defineStore } from "pinia";
import { register, login, logout } from "../api/auth.api";
import { useToast } from "vue-toastification";
import Account from "../types/account-type";
import router from "../router/router";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            account: JSON.parse(localStorage.getItem("account")!) || {} as Account,
            accountStatus: "",
            token: localStorage.getItem("token") || "",
        };
    },
    getters: {},
    actions: {
        async postRegister(payload: FormData) {
            return register(payload)
                .then((response) => {
                    router.push({ name: "Login" })

                    toast.success(response.message, {
                        timeout: 5000,
                    });
                })
                .catch((error) => {
                    toast.error(error.message, {
                        timeout: 5000,
                    });
                })
        },
        async postLogin(payload: Object) {
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

                    toast.success(response.message, {
                        timeout: 5000,
                    });
                })
                .catch((error) => {
                    if (error.status === 401) {
                        toast.warning(error.response.data.error, {
                            timeout: 5000,
                        });
                    } else {
                        toast.error(error.message, {
                            timeout: 5000,
                        });
                    }
                });
        },
        async postLogout() {
            return logout()
                .then((response) => {
                    this.$reset()
                    localStorage.clear()
                    window.location.href = "/"

                    toast.success(response.message, {
                        timeout: 5000,
                    });
                })
                .catch((_) => {
                    toast.error("Failed to logout: Internal server error", {
                        timeout: 5000,
                    });
                })
        },
    },
});
