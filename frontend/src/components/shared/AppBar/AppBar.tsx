import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

import Burger from "../Burger/Burger";

import css from "./AppBar.module.css";
import { useEffect, useState } from "react";
import { getSubdomain } from "../../../utils/helpers";

type Props = {
  Navigation: React.FunctionComponent<{ isOpen: boolean }>;
};

export default function AppBar({ Navigation }: Props) {
  const [open, setOpen] = useState(false);
  const currentRoute = useLocation().pathname;
  const currentSubdomain = getSubdomain();

  const handleBurgerChange = () => {
    if (!open) setOpen(true);
    else setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [currentRoute]);

  return (
    <>
      <header
        className={clsx(
          css.header,
          (currentRoute == "/" || currentRoute == "/movement") &&
            currentSubdomain !== "merch" &&
            css.headerBlured
        )}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={clsx(
              css.logo,
              currentRoute == "/" && currentSubdomain == "" && css.logoSmall
            )}
          />
        </Link>
        <Navigation isOpen={open} />
        <Burger isOpen={open} onClick={handleBurgerChange} />
      </header>
    </>
  );
}
