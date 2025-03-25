import { FaTelegramPlane, FaInstagram, FaFacebook } from "react-icons/fa";
import map from "../../../assets/about/map.png";
import css from "./AboutContacts.module.css";

export default function AboutContacts() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Контакти</p>
        <div className={css.list}>
          <a href="https://t.me/PoklykYaru" className={css.link}>
            <FaTelegramPlane className={css.icon} />
          </a>
          <a href="https://www.instagram.com/poklyk.yaru" className={css.link}>
            <FaInstagram className={css.icon} />
          </a>
          <a href="https://www.facebook.com/poklyk.yaru" className={css.link}>
            <FaFacebook className={css.icon} />
          </a>
        </div>
        <div className={css.mapWrapper}>
          <img src={map} alt="Мапа України" className={css.map} />
          <a
            target="blank"
            href="https://maps.app.goo.gl/1CBZoq3Vt6hHQhqk7"
            className={css.mapLink}
          ></a>
        </div>
      </div>
    </>
  );
}
