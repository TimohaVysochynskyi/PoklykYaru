import { Link } from "react-router-dom";
import css from "./EventTop.module.css";
import clsx from "clsx";

type Props = {
  active: string;
};

export default function EventTop({ active }: Props) {
  const items = [
    { title: "Літній табір", image: "tabir", path: "tabir" },
    {
      title: "Зимовий похід ім. Ю. Горліс-Горського",
      image: "pohid",
      path: "pohid",
    },
    {
      title: "Туристичний змаг ім. Василя Чучупаки",
      image: "zmah",
      path: "zmah",
    },
    {
      title: "Свято Покрови в Холодному Яру",
      image: "pokrova",
      path: "pokrova",
    },
  ];

  return (
    <>
      <ul className={css.list}>
        {items.map((item) => (
          <li
            className={clsx(
              active == "events" ? css.item : css.smallItem,
              item.image == active && css.bigItem
            )}
            key={item.image}
          >
            <Link to={item.path}>
              <img
                src={`/event/${item.image}.webp`}
                alt=""
                className={css.image}
              />
              {active == "events" && <p className={css.title}>{item.title}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
