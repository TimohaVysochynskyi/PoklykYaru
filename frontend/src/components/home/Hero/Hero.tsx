import { useEffect, useState } from "react";
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
import Loader from "../../shared/Loader/Loader";
import css from "./Hero.module.css";

type Slide = { name: string; title: string };

const FADE_DURATION_MS = 1200;
const AUTOPLAY_DELAY_MS = 10000;

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

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isHiDPI, setIsHiDPI] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduceMotion(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Detect hi-DPI display
  useEffect(() => {
    const readDPR = () => setIsHiDPI(window.devicePixelRatio > 1);
    readDPR();
    window.addEventListener("resize", readDPR);
    return () => window.removeEventListener("resize", readDPR);
  }, []);

  // Preload first slide images
  useEffect(() => {
    let bgLoaded = false;
    let layerLoaded = false;

    const checkBothLoaded = () => {
      if (bgLoaded && layerLoaded) {
        setIsLoaded(true);
      }
    };

    const bgImg = new Image();
    bgImg.onload = () => {
      bgLoaded = true;
      checkBothLoaded();
    };
    bgImg.src = `/hero/${slides[0].name}.webp`;

    // Check if first slide has layer
    const hasLayer = slides[0].name !== "molod";
    if (hasLayer) {
      const layerImg = new Image();
      layerImg.onload = () => {
        layerLoaded = true;
        checkBothLoaded();
      };
      layerImg.src = `/hero/${slides[0].name}-layer.webp`;
    } else {
      layerLoaded = true;
      checkBothLoaded();
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Preload next slide images
  useEffect(() => {
    if (!isLoaded) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    if (loadedImages.has(nextIndex)) return;

    const nextSlide = slides[nextIndex];
    const hasLayer = nextSlide.name !== "molod";

    const bgImg = new Image();
    bgImg.src = `/hero/${nextSlide.name}.webp`;

    if (hasLayer) {
      const layerImg = new Image();
      layerImg.src = `/hero/${nextSlide.name}-layer.webp`;

      bgImg.onload = () => {
        layerImg.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(nextIndex));
        };
      };
    } else {
      bgImg.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(nextIndex));
      };
    }
  }, [currentIndex, isLoaded, loadedImages]);

  // Autoplay
  useEffect(() => {
    if (!isLoaded) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(timer);
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className={css.loaderContainer}>
        <Loader size="80" />
      </div>
    );
  }

  return (
    <div className={clsx(css.container, isHiDPI && css.dprScaled)}>
      {slides.map((slide, i) => (
        <HeroSlide
          key={slide.name}
          name={slide.name}
          title={slide.title}
          isHiDPI={isHiDPI}
          isActive={i === currentIndex}
          transitionDuration={reduceMotion ? 0 : FADE_DURATION_MS}
        />
      ))}
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
  );
}
