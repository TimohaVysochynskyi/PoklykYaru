import { useEffect, useState } from "react";
import clsx from "clsx";

import map from "../../../assets/map/bg.webp";
import finger from "../../../assets/map/finger.png";

import { mapPointType } from "../../../types/common.types";

import css from "./Map.module.css";
import MapDescription from "../MapDescription/MapDescription";

const pointData = [
  {
    title: "Відповідальність",
    text: "Відповідальність — це готовність діяти і відповідати за свої дії, слова, результати. Це не про правильність, а про рішення робити наперекір невизначеності. Саме ця риса є підґрунтям засад нашої системи виховання молоді. Бо ми віримо, що так торується найшвидший шлях до розбудови успішної та сильної держави",
  },

  {
    title: "Патріотизм",
    text: "Виховання патріотизму стає актуальним лише тоді, коли вихованець усвідомлює важливість двох інших цінностей: побратимства та дисципліни. Патріотичне виховання сприяє створенню в Україні гідної і всебічно розвиненої молоді, яка пишається своє Державою, шанує Родину і Культуру та готова діяти й не боятися викликів долі",
  },
  {
    title: "Дисципліна",
    text: "Надзвичайно важливу роль грає дисципліна. Без цієї цінності неможливо побудувати сильну державу та виховати нове покоління. Дисципліна вчить вихованців системності та організованості",
  },
  {
    title: "Побратимство",
    text: "Найважливішою цінністю в Поклик Яру є побратимство. Воно закладає основу для всіх інших цінностей і є тим, що об'єднує вихованців у справжню родину однодумців",
  },
  {
    title: "Табір",
    text: "Саме табір стає відправною точкою на шляху вихованця в Поклик Яру. Тут закладаються основи, формуються цінності та базові навички. На таборі вихованець отримує неймовірний досвід справжнього побратимства, вчиться відповідальності та дисципліні, а також отримує важливі знання на гутірках",
  },
];

const pointCoords = [
  { id: 1, x: "8%", y: "2%" },
  { id: 2, x: "30%", y: "24%" },
  { id: 3, x: "42%", y: "48%" },
  { id: 4, x: "68%", y: "65%" },
  { id: 5, x: "58%", y: "86%" },
];

export default function SpotlightOnImage() {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hoveredPoints, setHoveredPoints] = useState<mapPointType[]>([
    pointData[4],
  ]);
  const [isMouseInMap, setIsMouseInMap] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const mapElement = document.querySelector(
        `.${css.mapWrapper}`
      ) as HTMLDivElement;

      if (mapElement) {
        const rect = mapElement.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsMouseInMap(isInside);

        if (isInside) {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        } else {
          setMousePosition(null);
        }
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  const handleMouseEnter = (point: mapPointType) => {
    // Prevent duplicates
    if (!hoveredPoints.some((p) => p.title === point.title)) {
      setHoveredPoints((prev) => [point, ...prev]);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.titleWrapper}>
          <h2 className={css.title}>Шлях вихованця</h2>
        </div>
        <div className={css.mapWrapper}>
          <img src={map} alt="Background" className={css.mapImage} />
          {pointCoords.map((point, index) => (
            <div
              key={point.id}
              className={css.point}
              style={{ top: point.y, left: point.x }}
              onMouseEnter={() =>
                handleMouseEnter({
                  title: pointData[index].title,
                  text: pointData[index].text,
                })
              }
            ></div>
          ))}
          <div
            className={css.mapOverlay}
            style={{
              background: mousePosition
                ? `radial-gradient(25.94% 25.94% at ${mousePosition.x}px ${mousePosition.y}px, transparent 0px, rgba(0, 0, 0, 0) 0%,rgba(27, 41, 44, 0.98) 100%)`
                : "radial-gradient(25.94% 25.94% at 62% 90%, transparent 0px, rgba(0, 0, 0, 0) 0%,rgba(27, 41, 44, 0.98) 100%)",
              transition: "background 0.2s ease-in-out",
            }}
          >
            <img
              src={finger}
              alt="Hover mouse here"
              className={clsx(
                css.finger,
                isMouseInMap && css.fingerHide,
                !isMouseInMap && css.fingerShow
              )}
            />
          </div>
        </div>
        <div className={css.listWrapper}>
          <MapDescription points={hoveredPoints} />
        </div>
      </div>
    </>
  );
}
