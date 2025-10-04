import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventByPath } from "../../../services/events";
import { EventType } from "../../../types/Event.types";
import Loader from "../../shared/Loader/Loader";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import css from "./EventContent.module.css";

export default function EventContent() {
  const { eventPath } = useParams<{ eventPath: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventPath) return;

      try {
        const response = await fetchEventByPath(eventPath);
        setEvent(response.data);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventPath]);

  if (loading) {
    return (
      <div className={css.loaderContainer}>
        <Loader size="60" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className={css.container}>
        <p className={css.error}>Захід не знайдено</p>
      </div>
    );
  }

  return (
    <>
      <div className={css.titleContainer}>
        <p className={css.title}>{event.title}</p>
        {event.buttonText && event.buttonLink && (
          <a
            href={event.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={css.button}
          >
            {event.buttonText}
            <HiMiniArrowUpRight className={css.arrow} />
          </a>
        )}
      </div>
      <p className={css.description}>{event.description}</p>
    </>
  );
}
