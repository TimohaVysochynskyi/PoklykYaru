import { useState, useRef, useEffect } from "react";
import valuesImage from "../../assets/values/values.webp";
import css from "./ValuesWrapper.module.css";
import ValuesList from "../ValuesList/ValuesList";

const values = ["pobratymstvo", "disciplina", "patriotysm"];

export default function ValuesWrapper() {
  const [currentImage, setCurrentImage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollTop + 400;
      const sectionHeight = scrollContainer.scrollHeight / values.length;
      const newImageIndex = Math.min(
        Math.floor(scrollPosition / sectionHeight),
        values.length - 1
      );
      setCurrentImage(newImageIndex);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={css.container}>
      <div className={css.col}>
        <div className={css.staticGroup}>
          <img
            src={valuesImage}
            alt="наші цінності"
            className={css.valuesImage}
          />
          <p className={css.title}>Цінності</p>
          <p className={css.subtitle}>Поклик Яру</p>
        </div>
        <div
          style={{
            backgroundImage: `url(../src/assets/values/${values[currentImage]}.webp)`,
          }}
          className={css.currentValueImage}
        ></div>
      </div>

      <div ref={scrollContainerRef} className={css.col}>
        <ValuesList />
      </div>
    </div>
  );
}
