import css from "./EventGallery.module.css";

export default function EventGallery() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Галерея заходів: </p>
        <div className={css.imagesWrapper}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <img
              src={`/event/gallery/${number}.webp`}
              alt="Фотографія"
              className={css.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
