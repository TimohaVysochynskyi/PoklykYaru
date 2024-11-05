import AppRouter from "../routers/AppRouter";
import MerchRouter from "../routers/MerchRouter";
import AdminRouter from "../routers/AdminRouter";
import MainNavigation from "../components/Navigation/MainNavigation";
import MerchNavigation from "../components/Navigation/MerchNavigation";

export const APPS = [
    {
        subdomain: "www",
        app: AppRouter,
        navigation: MainNavigation,
        main: true
    },
    {
        subdomain: "merch",
        app: MerchRouter,
        navigation: MerchNavigation,
        main: false
    },
    {
        subdomain: "admin",
        app: AdminRouter,
        navigation: null,
        main: false
    }
];

export const appDomain: string = "localhost:5173";
export const apiDomain: string = "http://localhost:3000"