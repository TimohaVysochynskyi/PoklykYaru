import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateAdminRoute from "../components/PrivateAdminRoute";
import RestrictedAdminRoute from "../components/RestrictedAdminRoute";

const AdminLoginPage = lazy(
  () => import("../pages/admin/AdminLoginPage/AdminLoginPage")
);
const AdminLayoutPage = lazy(
  () => import("../pages/admin/AdminLayoutPage/AdminLayoutPage")
);
const AdminMerchPage = lazy(
  () => import("../pages/admin/AdminMerchPage/AdminMerchPage")
);
const AdminMerchEditPage = lazy(
  () => import("../pages/admin/AdminMerchDetailsPage/AdminMerchDetailsPage")
);
const AdminPaymentsPage = lazy(
  () => import("../pages/admin/AdminPaymentsPage/AdminPaymentsPage")
);
const AdminEventsPage = lazy(
  () => import("../pages/admin/AdminEventsPage/AdminEventsPage")
);
const AdminEventNewPage = lazy(
  () => import("../pages/admin/AdminEventNewPage/AdminEventNewPage")
);
const AdminEventEditPage = lazy(
  () => import("../pages/admin/AdminEventEditPage/AdminEventEditPage")
);

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<RestrictedAdminRoute component={<AdminLoginPage />} />}
        ></Route>
        <Route
          path="/"
          element={<PrivateAdminRoute component={<AdminLayoutPage />} />}
        >
          <Route path="merch" element={<AdminMerchPage />}></Route>
          <Route
            path="merch/:productId"
            element={<AdminMerchEditPage />}
          ></Route>
          <Route path="payments" element={<AdminPaymentsPage />}></Route>
          <Route path="events" element={<AdminEventsPage />}></Route>
          <Route path="events/new" element={<AdminEventNewPage />}></Route>
          <Route path="events/:id" element={<AdminEventEditPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}
