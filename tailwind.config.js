/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/App.vue"],
    theme: {
        extend: {
            colors: {
                "main-green": "#00FF94",
                "main-red": "#FF4545",
                "main-yellow": "#FAFF00",
                "main-blue": "#00FFFF"
            },
            gridTemplateRows: {
                "auto-1": "repeat(1, minmax(0, auto))",
                "auto-2": "repeat(2, minmax(0, auto))",
                "auto-3": "repeat(3, minmax(0, auto))",
                "auto-4": "repeat(4, minmax(0, auto))",
                "auto-5": "repeat(5, minmax(0, auto))",
                "auto-6": "repeat(6, minmax(0, auto))"
            }
        }
    },
    plugins: []
};
