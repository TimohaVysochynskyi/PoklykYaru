import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { register } from "../../../redux/customerAuth/operations";

// types
import { RegisterCustomerType } from "../../../types/CustomerAuth.types";

// styles
import css from "./AuthForm.module.css";

const RegisterCustomerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Занадто коротке!")
    .max(50, "Занадто довге!")
    .required("Потрібно заповнити поле!"),
  lastName: Yup.string()
    .min(2, "Занадто коротке!")
    .max(50, "Занадто довге!")
    .required("Потрібно заповнити поле!"),
  phoneNumber: Yup.string()
    .min(2, "Занадто короткий!")
    .max(13, "Занадто довгий!")
    .required("Потрібно заповнити поле!"),
  password: Yup.string()
    .min(6, "Занадто короткий!")
    .max(50, "Занадто довгий!")
    .required("Потрібно заповнити поле!"),
  email: Yup.string().email("Має бути дійсною електронною поштою"),
});

export default function RegisterForm() {
  const id = useId();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: RegisterCustomerType) => {
    dispatch(
      register({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        password: values.password,
        email: values.email,
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
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
          }}
          validationSchema={RegisterCustomerSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.group}>
              <label htmlFor={`${id}-firstName`} className={css.label}>
                Ім'я:
              </label>
              <Field
                type="text"
                placeholder="Олександр"
                name="firstName"
                id={`${id}-firstName`}
                className={css.input}
              />
              <ErrorMessage
                name="firstName"
                component="span"
                className={css.error}
              ></ErrorMessage>
            </div>
            <div className={css.group}>
              <label htmlFor={`${id}-lastName`} className={css.label}>
                Прізвище:
              </label>
              <Field
                type="text"
                placeholder="Юрченко"
                name="lastName"
                id={`${id}-lastName`}
                className={css.input}
              />
              <ErrorMessage
                name="lastName"
                component="span"
                className={css.error}
              ></ErrorMessage>
            </div>
            <div className={css.group}>
              <label htmlFor={`${id}-phoneNumber`} className={css.label}>
                Номер телефону:
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
            <div className={css.group}>
              <label htmlFor={`${id}-email`} className={css.label}>
                Електронна пошта:
              </label>
              <Field
                type="email"
                placeholder="example@gmail.com"
                name="email"
                id={`${id}-email`}
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              ></ErrorMessage>
            </div>
            <div className={css.fullGroup}>
              <label htmlFor={`${id}-password`} className={css.label}>
                Пароль:
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
                Створити акаунт
              </button>
              <p className={css.text}>
                Вже маєте акаунт?&nbsp;
                <Link className={css.link} to="../login">
                  Увійти
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
