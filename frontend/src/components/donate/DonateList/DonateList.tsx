import monobazaImg from "../../../assets/donate/monobaza.webp";
import { PiJarBold } from "react-icons/pi";
import css from "./DonateList.module.css";

export default function DonateList() {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.col}>
            <p className={css.title}>
              Наша <span className={css.subtitle}>монобаза</span>
            </p>
            <p className={css.text}>
              «Поклик Яру» — неприбуткова організація. Наша діяльність живе за
              рахунок людей, які вірять в нас та нашу справу, й самих членів
              команди. Монобаза — спосіб регулярно долучатися до розвитку
              «Поклик Яру» гривнею. Підтримуючи нас, ви вкладаєтесь у системне
              виховання відповідальної молоді. Обирайте зручний для вас рівень
              та підписуйтеся на щомісячний донат. Наперед вдячні кожному. Свій
              до свого!
            </p>
            <a
              href="https://base.monobank.ua/27nRdVToxGcBps#subscriptions"
              className={css.link}
            >
              <PiJarBold className={css.icon} />
              Посилання на монобазу
            </a>
          </div>
          <div className={css.col}>
            <img src={monobazaImg} alt="Фото збору" className={css.image} />
          </div>
        </li>
      </ul>
    </>
  );
}
