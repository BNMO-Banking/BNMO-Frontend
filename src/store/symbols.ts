import { defineStore } from "pinia";

export const useSymbolsStore = defineStore("symbols", {
    state: () => ({
        symbols: {},
    }),
});
