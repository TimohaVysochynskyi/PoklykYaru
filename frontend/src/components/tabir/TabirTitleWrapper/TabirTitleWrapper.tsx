import { HiMiniArrowUpRight } from "react-icons/hi2";
import css from "./TabirTitleWrapper.module.css";
import { Link } from "react-router-dom";

export default function TabirTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Літній табір</p>
        <Link
          to="https://docs.google.com/forms/d/1OQU71dalInNHe6VdziI94-xzy5wXNT8-_EqLD_fyMEA/viewform?edit_requested=true"
          className={css.button}
        >
          Реєстрація на табір 2025
          <HiMiniArrowUpRight className={css.arrow} />
        </Link>
      </div>
    </>
  );
}
