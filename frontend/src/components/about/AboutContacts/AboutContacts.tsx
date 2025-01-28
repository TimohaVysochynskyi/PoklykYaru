import { FaTelegramPlane, FaInstagram, FaFacebook } from "react-icons/fa";
import map from "../../../assets/about/map.png";
import css from "./AboutContacts.module.css";

export default function AboutContacts() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Контакти</p>
        <div className={css.list}>
          <a href="#" className={css.link}>
            <FaTelegramPlane className={css.icon} />
          </a>
          <a href="#" className={css.link}>
            <FaInstagram className={css.icon} />
          </a>
          <a href="#" className={css.link}>
            <FaFacebook className={css.icon} />
          </a>
        </div>
        <div className={css.mapWrapper}>
          <img src={map} alt="Мапа України" className={css.map} />
          <a href="#" className={css.mapLink}></a>
        </div>
      </div>
    </>
  );
}
