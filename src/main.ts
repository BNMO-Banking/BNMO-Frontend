import { createApp, type Component } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import axios, { AxiosError } from "axios";
import router from "./router/router";
import Toast from "vue-toastification";
import App from "./App.vue";
import "vue-toastification/dist/index.css";
import { useAuthStore } from "./store/auth.store";

const pinia = createPinia();
axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_BASE_URL;
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error: AxiosError) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                const store = useAuthStore();
                store.$reset();
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.use(Toast, { timeout: 5000 });
app.mount("#app");
