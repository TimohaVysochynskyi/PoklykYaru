import RegisterForm from "../../components/merch/AuthForm/RegisterForm";
import css from "./MerchAuthPages.module.css";

export default function MerchRegisterPage() {
  return (
    <>
      <div className={css.container}>
        <RegisterForm />
      </div>
    </>
  );
}
