import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import Loader from "../shared/Loader/Loader";
import AppBar from "../shared/AppBar/AppBar";

import { getApp } from "../../utils/helpers";

import css from "./App.module.css";

export default function App() {
  const CurrentApp = getApp();

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
          {CurrentApp.subdomain === "admin" ? (
            <CurrentApp.app />
          ) : (
            <>
              {CurrentApp.navigation !== null && (
                <>
                  <AppBar Navigation={CurrentApp.navigation} />
                  <CurrentApp.app />
                </>
              )}
            </>
          )}
        </Suspense>
      </main>
    </>
  );
}
