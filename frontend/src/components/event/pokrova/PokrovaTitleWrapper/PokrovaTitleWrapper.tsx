import { Link } from "react-router-dom";
import css from "./PokrovaTitleWrapper.module.css";
import { HiMiniArrowUpRight } from "react-icons/hi2";

export default function PokrovaTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Покрова</p>
        <Link
          to="https://docs.google.com/forms/d/e/1FAIpQLSeWDdgKJ5yGjuYnrmx3u0A7W_EgrEMgJAiQjqqhQEM4fY6ckA/viewform"
          className={css.button}
        >
          Реєстрація на Покрову 2025
          <HiMiniArrowUpRight className={css.arrow} />
        </Link>
      </div>
    </>
  );
}
