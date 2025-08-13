import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";

import HeroSlide from "../HeroSlide/HeroSlide";
import ButtonCTA from "../../shared/ButtonCTA/ButtonCTA";
import css from "./Hero.module.css";

type Slide = { name: string; title: string };

const SLIDE_SPEED_MS = 1200; // match previous Swiper speed
const AUTOPLAY_DELAY_MS = 10000; // match previous Swiper delay

const slides: Slide[] = [
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
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCROFrx6_3YVPx2pKHyY8C2w",
    icon: <FaYoutube className={css.icon} />,
  },
];

export default function App() {
  // Build an extended list for seamless looping: [last, ...slides, first]
  const extendedSlides = useMemo<Slide[]>(
    () => [slides[slides.length - 1], ...slides, slides[0]],
    []
  );

  const [index, setIndex] = useState(1); // start from first real slide
  const [animate, setAnimate] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isHiDPI, setIsHiDPI] = useState(false);
  const indexRef = useRef(index);
  indexRef.current = index;

  // Preload images to minimize jank during transitions
  useEffect(() => {
    const urls = slides.flatMap((s) => [
      `/hero/${s.name}.webp`,
      `/hero/${s.name}-layer.webp`,
    ]);
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Respect reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Detect hi-DPI (Windows display scaling > 100%) and toggle class
  useEffect(() => {
    const readDPR = () => {
      // devicePixelRatio > 1 implies OS-level scaling or high DPI
      setIsHiDPI(window.devicePixelRatio > 1);
    };
    readDPR();
    window.addEventListener("resize", readDPR);
    window.addEventListener("orientationchange", readDPR);
    return () => {
      window.removeEventListener("resize", readDPR);
      window.removeEventListener("orientationchange", readDPR);
    };
  }, []);

  // Handle seamless jump from cloned last to first
  const handleTransitionEnd = () => {
    if (indexRef.current === extendedSlides.length - 1) {
      // We reached the cloned first slide; jump back to the real first slide without animation
      setAnimate(false);
      setIndex(1);
      // Re-enable animation on the next frame so future moves animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  };

  const translatePercent = (index * 100) / extendedSlides.length;

  return (
    <>
      <div className={clsx(css.container, isHiDPI && css.dprScaled)}>
        <div className={css.sliderViewport}>
          <div
            className={clsx(css.slides, animate && css.animate)}
            style={{
              width: `${extendedSlides.length * 100}%`,
              transform: `translate3d(-${translatePercent}%, 0, 0)`,
              transitionDuration:
                animate && !reduceMotion ? `${SLIDE_SPEED_MS}ms` : undefined,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, i) => (
              <div
                key={`${slide.name}-${i}`}
                className={css.slide}
                style={{ flex: `0 0 ${100 / extendedSlides.length}%` }}
              >
                <HeroSlide
                  name={slide.name}
                  title={slide.title}
                  isHiDPI={isHiDPI}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={css.content}>
          <div className={css.buttonsWrapper}>
            <ButtonCTA
              target="blank"
              link="https://docs.google.com/forms/d/1OQU71dalInNHe6VdziI94-xzy5wXNT8-_EqLD_fyMEA/viewform?edit_requested=true"
            >
              Зареєструватись на табір
            </ButtonCTA>
            <Link to="/events" className={clsx(css.button, css.buttonOutlined)}>
              Інші заходи
            </Link>
          </div>
          <ul className={css.socialsList}>
            {socials.map((social) => (
              <li key={social.name} className={css.socialsItem}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
