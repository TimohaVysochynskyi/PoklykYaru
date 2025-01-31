import { HiMiniArrowUpRight } from "react-icons/hi2";
import logo from "../../../assets/logo.png";
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
        <div className={css.row}>
          <img src={logo} alt="Логотип" className={css.logo} />
          <p className={css.text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, ut voluptate! Harum sint quae illo deserunt repellat
            veniam, corporis veritatis velit aliquam atque delectus eligendi
            dicta, odio quidem quos optio?
          </p>
        </div>
      </div>
    </>
  );
}
