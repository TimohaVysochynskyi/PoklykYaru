import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateAdminRoute";
import RestrictedRoute from "../components/RestrictedAdminRoute";

const AdminLoginPage = lazy(
  () => import("../pages/admin/AdminLoginPage/AdminLoginPage")
);
const AdminLayoutPage = lazy(
  () => import("../pages/admin/AdminLayoutPage/AdminLayoutPage")
);
const AdminMerchPage = lazy(
  () => import("../pages/admin/AdminMerchPage/AdminMerchPage")
);

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<RestrictedRoute component={<AdminLoginPage />} />}
        ></Route>
        <Route
          path="/"
          element={<PrivateRoute component={<AdminLayoutPage />} />}
        >
          <Route
            path="merch"
            element={<PrivateRoute component={<AdminMerchPage />} />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}
