import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";

import HeroSlide from "../HeroSlide/HeroSlide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css";
import css from "./Hero.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const slides = [
  { name: "team", title: "команда" },
  { name: "vatra", title: "ватри" },
  { name: "molod", title: "молодь" },
  { name: "tabir", title: "табір" },
];
const socials = [
  {
    name: "telegram",
    link: "https://t.me/PoklykYaru",
    icon: <FaTelegramPlane className={css.icon} />,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/poklyk.yaru",
    icon: <FaInstagram className={css.icon} />,
  },
  {
    name: "facebook",
    link: "https://www.facebook.com/poklyk.yaru",
    icon: <FaFacebook className={css.icon} />,
  },
  {
    name: "tiktok",
    link: "https://www.tiktok.com/@poklyk.yaru",
    icon: <FaTiktok className={css.icon} />,
  },
];

export default function App() {
  return (
    <>
      <div className={css.container}>
        <Swiper
          spaceBetween={0}
          speed={1200}
          centeredSlides={true}
          simulateTouch={false}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className={css.swiper}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.name}>
              <HeroSlide name={slide.name} title={slide.title}></HeroSlide>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.content}>
          <div className={css.buttonsWrapper}>
            <Link
              target="blank"
              to="https://docs.google.com/forms/d/1OQU71dalInNHe6VdziI94-xzy5wXNT8-_EqLD_fyMEA/viewform?edit_requested=true"
              className={clsx(css.button, css.buttonFilled)}
            >
              Зареєструватись на табір
            </Link>
            <Link to="/events" className={clsx(css.button, css.buttonOutlined)}>
              Інші заходи
            </Link>
          </div>
          <ul className={css.socialsList}>
            {socials.map((social) => (
              <li key={social.name} className={css.socialsItem}>
                <Link to={social.link}>{social.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
