import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <>
      <NavLink to="/merch/login" className={css.button}>
        Увійти
      </NavLink>
    </>
  );
}
