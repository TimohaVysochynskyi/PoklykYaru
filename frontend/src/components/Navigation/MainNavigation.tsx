import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { appDomain } from "../../utils/constants";

import css from "./Navigation.module.css";

type LinkClassType = {
  isActive: boolean;
};

export default function MainNavigation() {
  const linkClass = ({ isActive }: LinkClassType): string => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="/" className={linkClass}>
            Головна
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/about" className={linkClass}>
            Про нас
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/help" className={linkClass}>
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
