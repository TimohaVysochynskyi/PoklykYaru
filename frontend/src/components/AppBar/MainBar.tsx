import MainNavigation from "../Navigation/MainNavigation";

import css from "./AppBar.module.css";

export default function MainBar() {
  return (
    <>
      <header className={css.container}>
        <h1>POKLYK YARU MAZAFAKA</h1>
        <MainNavigation />
      </header>
    </>
  );
}
