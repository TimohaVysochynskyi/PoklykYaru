import AdminLogin from "../../../components/AdminLogin/AdminLogin";

import css from "./AdminLoginPage.module.css";

export default function AdminLoginPage() {
  return (
    <>
      <div className={css.container}>
        <AdminLogin />
      </div>
    </>
  );
}
