import AppRouter from "../routers/AppRouter";
import MerchRouter from "../routers/MerchRouter";
import MainBar from "../components/AppBar/MainBar";
import MerchBar from "../components/AppBar/MerchBar";

export const APPS = [
    {
        subdomain: "www",
        app: AppRouter,
        bar: MainBar,
        main: true
    },
    {
        subdomain: "merch",
        app: MerchRouter,
        bar: MerchBar,
        main: false
    }
];

export const appDomain: string = "localhost:5173";
export const apiDomain: string = "localhost:3000"