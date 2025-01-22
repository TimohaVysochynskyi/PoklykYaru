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
import logo from "../../assets/logo.png";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <Link to="/" className={css.logoWrapper}>
          <img src={logo} alt="Логотип" className={css.logo} />
        </Link>
        <div className={css.linksList}>
          <a href="#" className={css.linkBig}>
            Долучитись <HiMiniArrowUpRight className={css.arrow} />
          </a>
          <Link to="/help" className={css.linkBig}>
            Допомогти <HiMiniArrowUpRight className={css.arrow} />
          </Link>
        </div>
        <div className={css.linksList}>
          <a href="#" className={css.linkSmall}>
            <AiFillPhone className={css.linkIcon} /> +3800000000000
          </a>
          <a href="#" className={css.linkSmall}>
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
          <a href="#" className={css.socialLink}>
            <RiTelegramFill className={css.socialIcon} />
          </a>
          <a href="#" className={css.socialLink}>
            <RiInstagramLine className={css.socialIcon} />
          </a>
          <a href="#" className={css.socialLink}>
            <RiFacebookCircleFill className={css.socialIcon} />
          </a>
          <a href="#" className={css.socialLink}>
            <RiTiktokFill className={css.socialIcon} />
          </a>
        </div>
      </footer>
    </>
  );
}
