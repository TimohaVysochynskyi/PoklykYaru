import css from "./EventGallery.module.css";
import { EventType } from "../../../types/Event.types";

type Props = {
  event: EventType | null;
  isMainPage: boolean;
};

export default function EventGallery({ event, isMainPage }: Props) {
  // Don't render gallery on main events page
  if (isMainPage || !event) {
    return null;
  }

  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Галерея заходу:</p>
        <div className={css.imagesWrapper}>
          {event.galleryImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${event.title} - фото ${index + 1}`}
              className={css.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
