import { useEffect, useRef } from "react";
import { mapPointType } from "../../types/common.types";
import css from "./MapDescription.module.css";

type Props = {
  points: mapPointType[];
};

export default function MapDescription({ points }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const listElement = listRef.current;
      listElement.scrollTo({
        top: 0, // Прокрутка до нижнього краю
        behavior: "smooth", // Плавна анімація
      });
    }
  }, [points]);

  return (
    <>
      <ul className={css.list} ref={listRef}>
        {points.map((point) => (
          <li className={css.item} key={point.title}>
            <p className={css.title}>{point.title}</p>
            <p className={css.text}>{point.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
