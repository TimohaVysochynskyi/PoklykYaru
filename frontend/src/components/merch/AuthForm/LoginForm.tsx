import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { login } from "../../../redux/customerAuth/operations";

// types
import { LoginCustomerType } from "../../../types/CustomerAuth.types";

// styles
import css from "./AuthForm.module.css";

const RegisterCustomerSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Занадто короткий!")
    .max(13, "Занадто довгий!")
    .required("Потрібно заповнити поле!"),
  password: Yup.string()
    .min(6, "Занадто короткий!")
    .max(50, "Занадто довгий!")
    .required("Потрібно заповнити поле!"),
});

export default function LoginForm() {
  const id = useId();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: LoginCustomerType) => {
    dispatch(
      login({
        phoneNumber: values.phoneNumber,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => navigate("/merch"))
      .catch(() => {
        toast.error("Невідома помилка");
      });
  };
  return (
    <>
      <div className={css.container}>
        <Formik
          initialValues={{
            phoneNumber: "",
            password: "",
          }}
          validationSchema={RegisterCustomerSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.fullGroup}>
              <label htmlFor={`${id}-phoneNumber`} className={css.label}>
                Номер телефону
              </label>
              <Field
                type="text"
                placeholder="+380 00 000 0000"
                name="phoneNumber"
                id={`${id}-phoneNumber`}
                className={css.input}
              />
              <ErrorMessage
                name="phoneNumber"
                component="span"
                className={css.error}
              ></ErrorMessage>
            </div>
            <div className={css.fullGroup}>
              <label htmlFor={`${id}-password`} className={css.label}>
                Пароль
              </label>
              <Field
                type="password"
                placeholder="**********"
                name="password"
                id={`${id}-password`}
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              ></ErrorMessage>
            </div>
            <div className={css.formBottom}>
              <button type="submit" className={css.button}>
                Увійти
              </button>
              <p className={css.text}>
                Не маєте акаунту?&nbsp;
                <Link className={css.link} to="../register">
                  Створити
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
