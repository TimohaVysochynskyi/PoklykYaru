import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));

export default function MerchRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </>
  );
}
