import clsx from "clsx";
import { Link } from "react-router-dom";

import css from "./ButtonCTA.module.css";

type Props = {
  target: "" | "blank";
  children: string;
  link: string;
};

export default function ButtonCTA({ target, children, link }: Props) {
  return (
    <>
      <Link target={target} to={link} className={clsx(css.button)}>
        {children}
      </Link>
    </>
  );
}
