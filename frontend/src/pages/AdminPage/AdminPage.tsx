import AdminLogin from "../../components/AdminLogin/AdminLogin";

import css from "./AdminPage.module.css";

export default function AdminPage() {
  return (
    <>
      <div className={css.container}>
        <AdminLogin />
      </div>
    </>
  );
}
