import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

// import { appDomain } from "../../../utils/constants";

import css from "./Navigation.module.css";

type Props = {
  isOpen: boolean;
};

export default function MainNavigation({ isOpen }: Props) {
  const currentRoute = useLocation().pathname;

  const linkClass = () => {
    if (currentRoute == "/") {
      return clsx(css.link, css.lightLink);
    } else {
      return clsx(css.link);
    }
  };

  return (
    <>
      <ul className={clsx(css.list, isOpen && css.listOpened)}>
        <li className={css.item}>
          <NavLink to="/" className={linkClass}>
            Головна
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/about" className={linkClass}>
            Хто ми
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="/events" className={linkClass}>
            Заходи
          </NavLink>
        </li>
        {/* <li className={css.item}>
          <NavLink to="/movement" className={linkClass}>
            Рух
          </NavLink>
        </li> */}
        <li className={css.item}>
          <NavLink to="/donate" className={linkClass}>
            Підтримати
          </NavLink>
        </li>
        {/* <li className={css.item}>
          <NavLink to={`http://merch.${appDomain}`} className={linkClass}>
            Мерч
          </NavLink>
        </li> */}
        {/* <li className={css.item}>
          <NavLink to="/gallery" className={linkClass}>
            Галерея
          </NavLink>
        </li> */}
      </ul>
    </>
  );
}
