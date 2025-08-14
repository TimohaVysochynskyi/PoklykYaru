import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { loginAdmin } from "../../../redux"; // назви операції можна змінити

// types
import { LoginAdminType } from "../../../types/AdminAuth.types";

// стилі
import css from "./AdminLogin.module.css";
import { Link } from "react-router-dom";

const AdminLoginSchema = Yup.object().shape({
  psevdo: Yup.string()
    .min(2, "Занадто короткий!")
    .required("Потрібно заповнити поле!"),
  password: Yup.string()
    .min(6, "Занадто короткий!")
    .max(50, "Занадто довгий!")
    .required("Потрібно заповнити поле!"),
});

export default function AdminLogin() {
  const id = useId();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (values: LoginAdminType) => {
    dispatch(
      loginAdmin({
        psevdo: values.psevdo,
        password: values.password,
      })
    )
      .unwrap()
      .catch(() => {
        toast.error("Невідома помилка");
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-12 w-auto" />
        <h2 className="mt-8 text-center text-2xl font-bold text-gray-900">
          Увійдіть у свій акаунт
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            psevdo: "",
            password: "",
          }}
          validationSchema={AdminLoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor={`${id}-psevdo`}
                className="block text-sm font-medium text-gray-900"
              >
                Псевдо
              </label>
              <div className="mt-2">
                <Field
                  id={`${id}-psevdo`}
                  name="psevdo"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <ErrorMessage
                  name="psevdo"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`${id}-password`}
                className="block text-sm font-medium text-gray-900"
              >
                Пароль
              </label>
              <div className="mt-2">
                <Field
                  id={`${id}-password`}
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </Form>
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Не туди попали?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Повернутися на Головну
          </Link>
        </p>
      </div>
    </div>
  );
}
