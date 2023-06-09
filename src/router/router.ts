import { createRouter, createWebHistory } from "vue-router";

// Public modules
const Landing = () => import("../views/Landing.vue");
const Login = () => import("../views/Login.vue");
const Register = () => import("../views/Register.vue");

// Admin modules
const Dashboard = () => import("../views/admin/Dashboard.vue");
const AccountVerification = () => import("../views/admin/AccountVerification.vue");
const RequestVerification = () => import("../views/admin/RequestVerification.vue");
// const CustomerData = () => import("../components/pages/admin/CustomerData.vue");

// Customer modules
const Profile = () => import("../views/customer/Profile.vue");
const Request = () => import("../views/customer/Request.vue");
const Transfer = () => import("../views/customer/Transfer.vue");
// const History = () => import("../components/pages/customer/History.vue");

// Utility modules
// const Unauthorized = () => import("../components/pages/Unauthorized.vue");

const routes = [
    { path: "/", name: "Landing", component: Landing },
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/admin/accountverification",
        name: "Account Verification",
        component: AccountVerification
    },
    {
        path: "/admin/requestverification",
        name: "Request Verification",
        component: RequestVerification
    },
    { path: "/request", name: "Request", component: Request },
    { path: "/transfer", name: "Transfer", component: Transfer },
    { path: "/profile", name: "Profile", component: Profile }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// Navigation guard
// router.beforeEach((to, _) => {
//     const toast = useToast();
//     const store = useAuthStore();
//     if (store.ID === 0 && to.name !== "Login" && to.name !== "Register" && to.name !== "Landing") {
//         toast.error("Access denied. Login required", {
//             timeout: 5000,
//         });
//         return { name: "Login" };
//     } else {
//         // Handle customer trying to access admin pages
//         if (!store.is_admin && to.fullPath.includes("/admin")) {
//             console.log("customeradmin");
//             return { name: "Unauthorized" };
//             // Handle admin trying to access customer pages
//         } else if (store.is_admin && (to.name === "Transfer" || to.name === "Request" || to.name === "History" || to.name === "Profile")) {
//             console.log("admincustomer");
//             return { name: "Unauthorized" };
//         }
//     }
// });

export default router;
