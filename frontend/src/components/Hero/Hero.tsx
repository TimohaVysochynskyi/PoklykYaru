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
            <button
              type="button"
              className={clsx(css.button, css.buttonFilled)}
            >
              Зареєструватись на табір
            </button>
            <button
              type="button"
              className={clsx(css.button, css.buttonOutlined)}
            >
              Інші заходи
            </button>
          </div>
          <ul className={css.socialsList}>
            {socials.map((social) => (
              <li key={social.name} className={css.socialsItem}>
                <a href={social.link}>{social.icon}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
