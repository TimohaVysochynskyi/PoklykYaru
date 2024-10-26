import { NavLink } from "react-router-dom";

import { appDomain } from "../../utils/constants";

import css from "./Navigation.module.css";

export default function MainNavigation() {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="/" className={css.link}>
            Головна
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/about" className={css.link}>
            Про нас
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/help" className={css.link}>
            Допомога
          </NavLink>
        </li>
        <li className={css.item}>
          <a href={`http://merch.${appDomain}`} className={css.link}>
            Мерч
          </a>
        </li>
      </ul>
    </>
  );
}
