import RegisterForm from "../../components/AuthForm/RegisterForm";
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
