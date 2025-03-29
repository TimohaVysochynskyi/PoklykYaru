import css from "./EventGallery.module.css";

type Props = {
  folder: string;
}

export default function EventGallery({ folder }: Props) {
  if (folder == "events") folder = "idle";
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>{folder == "events" ? <>Галерея заходів:</> : <>Галарея заходу:</>}</p>
        <div className={css.imagesWrapper}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <img
              key={number}
              src={`/event/gallery/${folder}/${number}.webp`}
              alt="Фотографія"
              className={css.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
