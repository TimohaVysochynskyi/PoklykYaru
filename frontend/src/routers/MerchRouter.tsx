import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const MerchPage = lazy(() => import("../pages/MerchPage/MerchPage"));

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MerchPage />} />
      </Routes>
    </>
  );
}
