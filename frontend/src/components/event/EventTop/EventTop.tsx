import { Link } from "react-router-dom";
import css from "./EventTop.module.css";
import clsx from "clsx";
import { EventType } from "../../../types/Event.types";

type Props = {
  active: string;
  events: EventType[];
};

export default function EventTop({ active, events }: Props) {
  return (
    <>
      <ul className={css.list}>
        {events.map((event) => (
          <li
            className={clsx(
              active === "events" ? css.item : css.smallItem,
              event.path === active && css.bigItem
            )}
            key={event._id}
          >
            <Link to={event.path}>
              <img
                src={event.mainImage}
                alt={event.title}
                className={css.image}
              />
              {active === "events" && (
                <p className={css.title}>{event.title}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
