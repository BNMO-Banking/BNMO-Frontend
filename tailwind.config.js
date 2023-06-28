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
            }
        }
    },
    plugins: []
};
