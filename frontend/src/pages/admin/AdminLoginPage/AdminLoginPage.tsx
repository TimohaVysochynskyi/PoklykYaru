import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AdminLogin from "../../../components/admin/AdminLogin/AdminLogin";

import { AppDispatch } from "../../../redux/store";
import { refreshAdmin } from "../../../redux";

import css from "./AdminLoginPage.module.css";

export default function AdminLoginPage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAdmin());
  }, [dispatch]);

  return (
    <>
      <div className={css.container}>
        <AdminLogin />
      </div>
    </>
  );
}
