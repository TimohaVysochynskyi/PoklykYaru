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
  RiYoutubeFill,
} from "react-icons/ri";
import logo from "../../../assets/logo.png";
import css from "./Footer.module.css";
import clsx from "clsx";

const socials = [
  {
    name: "telegram",
    link: "https://t.me/PoklykYaru",
    icon: <RiTelegramFill className={css.socialIcon} />,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/poklyk.yaru",
    icon: <RiInstagramLine className={css.socialIcon} />,
  },
  {
    name: "facebook",
    link: "https://www.facebook.com/poklyk.yaru",
    icon: <RiFacebookCircleFill className={css.socialIcon} />,
  },
  {
    name: "tiktok",
    link: "https://www.tiktok.com/@poklyk.yaru",
    icon: <RiTiktokFill className={css.socialIcon} />,
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCROFrx6_3YVPx2pKHyY8C2w",
    icon: <RiYoutubeFill className={css.socialIcon} />,
  },
];

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
          <a
            href="https://docs.google.com/forms/d/1RjXHBQWtLBUeMnhjEnP997u83JKJ9wmPg8ss4cNN5jI/viewform?edit_requested=true"
            className={css.linkBig}
          >
            Долучитись <HiMiniArrowUpRight className={css.arrow} />
          </a>
        </div>
        <div className={css.linksList}>
          <a href="tel:+380956267773" className={css.linkSmall}>
            <AiFillPhone className={css.linkIcon} /> +380 95 626 77 73
          </a>
          <a href="https://t.me/PoklykYaru" className={css.linkSmall}>
            <FaTelegramPlane className={css.linkIcon} /> t.me/PoklykYaru
          </a>
        </div>
        <div className={css.linksList}>
          <a href="mailto:poklyk.yaru@gmail.com" className={css.linkSmall}>
            <AiFillMail className={css.linkIcon} /> poklyk.yaru@gmail.com
          </a>
          <a href="#" className={css.linkSmall}>
            <BsGeoAltFill className={css.linkIcon} /> с. Мельники
          </a>
        </div>
        <div className={css.socialsList}>
          {socials.map((social) => (
            <Link key={social.name} to={social.link} className={css.socialLink}>
              {social.icon}
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
