import clsx from "clsx";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

import Burger from "../Burger/Burger";

import css from "./AppBar.module.css";
import { useState } from "react";

type Props = {
  Navigation: React.FunctionComponent<{ isOpen: boolean }>;
};

export default function AppBar({ Navigation }: Props) {
  const [open, setOpen] = useState(false);

  const handleBurgerChange = () => {
    if (!open) setOpen(true);
    else setOpen(false);
  };

  return (
    <>
      <header className={clsx(css.header, "header")}>
        <Link to="/">
          <img src={logo} alt="Logo" className={clsx(css.logo, "logo")} />
        </Link>
        <Navigation isOpen={open} />
        <Burger isOpen={open} onClick={handleBurgerChange} />
      </header>
    </>
  );
}
