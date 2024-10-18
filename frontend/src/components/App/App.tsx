import { Suspense } from "react";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";

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
              <Loader />
            </div>
          }
        >
          <CurrentApp.bar />
          <CurrentApp.app />
        </Suspense>
      </Layout>
    </>
  );
}
