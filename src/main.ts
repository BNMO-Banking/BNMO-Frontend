import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import axios from "axios";
import router from "./router/router";
import Toast from "vue-toastification";
import App from "./App.vue";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_BASE_URL

const token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

createApp(App).use(pinia).use(router).use(Toast, {timeout: 5000}).mount("#app");