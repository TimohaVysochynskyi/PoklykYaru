import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import css from "./AppBar.module.css";

type Props = {
  Navigation: React.FunctionComponent;
};

export default function MainBar({ Navigation }: Props) {
  return (
    <>
      <header className={css.header}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Navigation />
      </header>
    </>
  );
}
