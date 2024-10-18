import MerchNavigation from "../Navigation/MerchNavigation";

import css from "./AppBar.module.css";

export default function MerchBar() {
  return (
    <>
      <header className={css.container}>
        <h1>POKLYK YARU MAZAFAKA</h1>
        <MerchNavigation />
      </header>
    </>
  );
}
