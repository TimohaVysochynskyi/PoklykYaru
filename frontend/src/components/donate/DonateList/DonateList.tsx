import image1 from "../../../assets/donate/1.webp";
import { PiJarBold } from "react-icons/pi";
import css from "./DonateList.module.css";

export default function DonateList() {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.col}>
            <p className={css.title}>
              Збір на <span className={css.subtitle}>скеледром</span>
            </p>
            <p className={css.text}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusantium magnam facilis exercitationem. Cupiditate nulla
              exercitationem officiis culpa, sit recusandae eos? Earum sunt
              dolorem itaque aspernatur? Veniam animi id cupiditate hic.
            </p>
            <a href="" className={css.link}>
              <PiJarBold className={css.icon} />
              Посилання на банку
            </a>
          </div>
          <div className={css.col}>
            <img src={image1} alt="Фото збору" className={css.image} />
          </div>
        </li>
      </ul>
    </>
  );
}
