import clsx from "clsx";
import { NavLink } from "react-router-dom";

import { appDomain } from "../../utils/constants";

import css from "./Navigation.module.css";

type Props = {
  isOpen: boolean;
};

export default function MainNavigation({ isOpen }: Props) {
  return (
    <>
      <ul className={clsx(css.list, isOpen && css.listOpened)}>
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
