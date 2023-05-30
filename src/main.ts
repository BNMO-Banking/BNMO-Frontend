import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
pinia.use((context) => {
    const storeId = context.store.$id;

    // sync store from localstorage
    if (localStorage.getItem(storeId)) {
        const accountStorage = JSON.parse(
            localStorage.getItem(storeId) as string
        );
        context.store.$patch(accountStorage);
    }

    // listen for changes and update localstorage
    context.store.$subscribe((mutation, state) => {
        localStorage.setItem(storeId, JSON.stringify(state));
    });
});

createApp(App).use(pinia).use(router).use(Toast).mount("#app");
