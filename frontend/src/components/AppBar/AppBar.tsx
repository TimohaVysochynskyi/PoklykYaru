import { appDomain } from "../../utils/constants";

import logo from "../../assets/logo.png";

import css from "./AppBar.module.css";

type Props = {
  Navigation: React.FunctionComponent;
};

export default function MainBar({ Navigation }: Props) {
  return (
    <>
      <header className={css.container}>
        <a href={`http://${appDomain}`}>
          <img src={logo} alt="Logo" />
        </a>
        <Navigation />
      </header>
    </>
  );
}
