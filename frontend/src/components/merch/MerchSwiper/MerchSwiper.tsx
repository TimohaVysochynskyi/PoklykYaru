import { useState, useRef } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

// styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import css from "./MerchSwiper.module.css";

type Props = {
  images: string[];
};

export default function MerchSwiper({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className={css.container}>
      <Swiper
        direction="vertical"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar, Thumbs]}
        className={css.mainSwiper}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Зберігаємо екземпляр Swiper
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={css.swiperSlide}>
            <img src={`${image}`} alt="Картинка" className={css.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.thumbnails}>
        {images.map((thumbnail, index) => (
          <img
            key={index}
            src={`${thumbnail}`}
            alt="Картинка"
            className={clsx(css.thumbnail, activeIndex === index && css.active)}
            onClick={() => swiperRef.current?.slideTo(index)} // Перемикаємо слайд при натисканні
          />
        ))}
      </div>
    </div>
  );
}
