import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/customerAuth/operations";

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

type LoginCustomerType = {
  phoneNumber: string;
  password: string;
};

export default function LoginForm() {
  const id = useId();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (values: LoginCustomerType) => {
    dispatch(
      login({
        phoneNumber: values.phoneNumber,
        password: values.password,
      })
    )
      .unwrap()
      .catch(() => {
        toast.error("Невідома помилка");
      });
  };
  return (
    <>
      <div className={css.container}>
        <Toaster
          containerStyle={{
            position: "relative",
          }}
          position="top-right"
          reverseOrder={false}
        />

        <Formik
          initialValues={{
            phoneNumber: "",
            password: "",
          }}
          validationSchema={RegisterCustomerSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <h2 className={css.title}>Логін</h2>
            <div className={css.group}>
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
            <div className={css.group}>
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
            <button type="submit" className={css.button}>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
