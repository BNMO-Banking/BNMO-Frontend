import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
    state: () => ({
        is_admin: false,
        ID: 0,
        CreatedAt: new Date(),
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        image_path: "",
        account_number: "",
        balance: 0,
    }),
});
