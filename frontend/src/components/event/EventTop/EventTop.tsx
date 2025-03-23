import { Link } from "react-router-dom";
import css from "./EventTop.module.css";
import clsx from "clsx";

type Props = {
  active: "tabir" | "idle";
};

export default function EventTop({ active }: Props) {
  const items = [
    { title: "Літній табір", image: "tabir", path: "../tabir" },
    {
      title: 'Акція "Щедруй для захисників"',
      image: "shchedrui",
      path: "../tabir",
    },
    {
      title: "Зимовий похід ім. Ю. Горліс-Горського",
      image: "pohid",
      path: "../tabir",
    },
    {
      title: "Туристичний змаг ім. Василя Чучупаки",
      image: "zmah",
      path: "../tabir",
    },
    { title: "Покрова", image: "pokrova", path: "../tabir" },
  ];

  return (
    <>
      <ul className={css.list}>
        {items.map((item) => (
          <li
            className={clsx(
              active == "idle" ? css.item : css.smallItem,
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
              {active == "idle" && <p className={css.title}>{item.title}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
