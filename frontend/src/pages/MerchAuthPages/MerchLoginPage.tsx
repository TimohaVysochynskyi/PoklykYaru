import LoginForm from "../../components/merch/AuthForm/LoginForm";
import css from "./MerchAuthPages.module.css";

export default function MerchLoginPage() {
  return (
    <>
      <div className={css.container}>
        <LoginForm />
      </div>
    </>
  );
}
