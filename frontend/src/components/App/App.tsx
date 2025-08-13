import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import Loader from "../shared/Loader/Loader";
import AppBar from "../shared/AppBar/AppBar";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AppRouter from "../../routers/AppRouter";
import MerchRouter from "../../routers/MerchRouter";
import AdminRouter from "../../routers/AdminRouter";
import MainNavigation from "../shared/Navigation/MainNavigation";
import MerchNavigation from "../shared/Navigation/MerchNavigation";

import css from "./App.module.css";

export default function App() {
  const pathname = useLocation().pathname;
  const isAdmin = pathname.startsWith("/admin");
  const isMerch = pathname.startsWith("/merch");

  return (
    <>
      <main className={css.container}>
        <div className={css.bgColor}></div>
        <Suspense
          fallback={
            <div className={css.loaderWrapper}>
              <Loader size="80" />
            </div>
          }
        >
          <Toaster position="top-right" reverseOrder={false} />
          {!isAdmin && (
            <AppBar Navigation={isMerch ? MerchNavigation : MainNavigation} />
          )}
          <Routes>
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/merch/*" element={<MerchRouter />} />
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
