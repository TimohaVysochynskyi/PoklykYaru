import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const MerchPage = lazy(() => import("../pages/MerchPage/MerchPage"));
const MerchDetailsPage = lazy(
  () => import("../pages/MerchDetailsPage/MerchDetailsPage")
);

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MerchPage />} />
        <Route path="/:productId" element={<MerchDetailsPage />} />
      </Routes>
    </>
  );
}
