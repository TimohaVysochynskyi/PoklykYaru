import { HiMiniArrowUpRight } from "react-icons/hi2";
import css from "./EventTitleWrapper.module.css";

export default function EventTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <div className={css.row}>
          <p className={css.title}>Заходи</p>
          <button type="button" className={css.button}>
            <HiMiniArrowUpRight className={css.arrow} />
          </button>
        </div>
      </div>
    </>
  );
}
