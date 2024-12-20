import { Suspense } from "react";

import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import AppBar from "../AppBar/AppBar";

import { getApp } from "../../utils/helpers";

import css from "./App.module.css";

export default function App() {
  const CurrentApp = getApp();

  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className={css.loaderWrapper}>
              <Loader size="80" />
            </div>
          }
        >
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
      </Layout>
    </>
  );
}
