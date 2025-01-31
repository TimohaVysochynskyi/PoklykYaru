import image from "../../../assets/about/1.webp";
import css from "./EventGallery.module.css";

export default function EventGallery() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Галерея заходів: </p>
        <div className={css.imagesWrapper}>
          <img src={image} alt="Фотографія" className={css.image} />
          <img src={image} alt="Фотографія" className={css.image} />
          <img src={image} alt="Фотографія" className={css.image} />
          <img src={image} alt="Фотографія" className={css.image} />
          <img src={image} alt="Фотографія" className={css.image} />
          <img src={image} alt="Фотографія" className={css.image} />
        </div>
      </div>
    </>
  );
}
