import valuesImage from "../../assets/values/values.webp";
import firstImage from "../../assets/values/image.jpeg";
import css from "./Values.module.css";

export default function ValuesWrapper() {
  return (
    <div className={css.container}>
      <p className={css.title}>
        Цінності <span className={css.subtitle}>Поклик Яру</span>
      </p>
      <div className={css.row}>
        <div className={css.col}>
          <img
            src={valuesImage}
            alt="Наші цінності"
            className={css.valuesImage}
          />
        </div>
        <div className={css.col}>
          <p className={css.text}>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            magnam culpa voluptas optio nemo nobis, id enim ullam aut placeat
            suscipit molestias adipisci, eius laboriosam quasi, quam fugiat
            fugit illum! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Pariatur magnam culpa voluptas optio nemo nobis, id enim ullam
            aut placeat suscipit molestias adipisci, eius laboriosam quasi, quam
            fugiat fugit illum!"
          </p>
          <div className={css.imagesWrapper}>
            <img
              src={firstImage}
              alt="Зображення цінності"
              className={css.image}
            />
            <img
              src={firstImage}
              alt="Зображення цінності"
              className={css.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
