import { Link } from "react-router-dom";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { BsGeoAltFill } from "react-icons/bs";
import {
  RiTelegramFill,
  RiInstagramLine,
  RiFacebookCircleFill,
  RiTiktokFill,
} from "react-icons/ri";
import logo from "../../../assets/logo.png";
import css from "./Footer.module.css";
import clsx from "clsx";

export default function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <Link to="/" className={css.logoWrapper}>
          <img src={logo} alt="Логотип" className={css.logo} />
        </Link>
        <div className={css.linksList}>
          <Link to="/donate" className={clsx(css.linkBig, css.linkYello)}>
            Допомогти <HiMiniArrowUpRight className={css.arrow} />
          </Link>
          <a href="https://docs.google.com/forms/d/1RjXHBQWtLBUeMnhjEnP997u83JKJ9wmPg8ss4cNN5jI/viewform?edit_requested=true" className={css.linkBig}>
            Долучитись <HiMiniArrowUpRight className={css.arrow} />
          </a>
        </div>
        <div className={css.linksList}>
          <a href="#" className={css.linkSmall}>
            <AiFillPhone className={css.linkIcon} /> +380 95 626 77 73
          </a>
          <a href="https://t.me/PoklykYaru" className={css.linkSmall}>
            <FaTelegramPlane className={css.linkIcon} /> t.me/PoklykYaru
          </a>
        </div>
        <div className={css.linksList}>
          <a href="#" className={css.linkSmall}>
            <AiFillMail className={css.linkIcon} /> poklyk.yaru@gmail.com
          </a>
          <a href="#" className={css.linkSmall}>
            <BsGeoAltFill className={css.linkIcon} /> с. Мельники
          </a>
        </div>
        <div className={css.socialsList}>
          <a href="https://t.me/PoklykYaru" className={css.socialLink}>
            <RiTelegramFill className={css.socialIcon} />
          </a>
          <a href="https://www.instagram.com/poklyk.yaru" className={css.socialLink}>
            <RiInstagramLine className={css.socialIcon} />
          </a>
          <a href="https://www.facebook.com/poklyk.yaru" className={css.socialLink}>
            <RiFacebookCircleFill className={css.socialIcon} />
          </a>
          <a href="https://www.tiktok.com/@poklyk.yaru" className={css.socialLink}>
            <RiTiktokFill className={css.socialIcon} />
          </a>
        </div>
      </footer>
    </>
  );
}
