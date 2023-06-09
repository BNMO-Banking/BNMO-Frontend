import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import router from "./router/router";
import Toast from "vue-toastification";
import App from "./App.vue";
import "vue-toastification/dist/index.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(Toast).mount("#app");