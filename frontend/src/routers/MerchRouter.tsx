import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import RestrictedRoute from "../components/RestrictedCustomerRoute";

const MerchPage = lazy(() => import("../pages/MerchPage/MerchPage"));
const MerchDetailsPage = lazy(
  () => import("../pages/MerchDetailsPage/MerchDetailsPage")
);
const MerchRegisterPage = lazy(
  () => import("../pages/MerchAuthPages/MerchRegisterPage")
);
const MerchLoginPage = lazy(
  () => import("../pages/MerchAuthPages/MerchLoginPage")
);

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MerchPage />} />
        <Route path="/:productId" element={<MerchDetailsPage />} />
        <Route
          path="/register"
          element={<RestrictedRoute component={<MerchRegisterPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<MerchLoginPage />} />}
        />
      </Routes>
    </>
  );
}
