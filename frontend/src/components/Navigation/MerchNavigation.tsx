// import { NavLink } from "react-router-dom";
// import clsx from "clsx";

import { appDomain } from "../../utils/constants";

import css from "./Navigation.module.css";

// type LinkClassType = {
//   isActive: boolean;
// };

export default function MerchNavigation() {
  // const linkClass = ({ isActive }: LinkClassType): string => {
  //   return clsx(css.link, isActive && css.active);
  // };

  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <a href={`http://${appDomain}`} className={css.link}>
            Головна
          </a>
        </li>
        <li className={css.item}>
          <a href={`http://${appDomain}/help`} className={css.link}>
            Допомога
          </a>
        </li>
      </ul>
    </>
  );
}
