import sum from "../../../assets/numbers/sum.png";

import css from "./Numbers.module.css";

export default function Numbers() {
  return (
    <>
      <div className={css.container}>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.number}>521</p>
            <img src={sum} alt="Загалом" className={css.sum} />
            <p className={css.description}>Вихованців пройшло табір</p>
          </li>
          <li className={css.item}>
            <p className={css.number}>17</p>
            <img src={sum} alt="Загалом" className={css.sum} />
            <p className={css.description}>Змін проведено</p>
          </li>
          <li className={css.item}>
            <p className={css.number}>10 днів</p>
            <img src={sum} alt="Загалом" className={css.sum} />
            <p className={css.description}>Тривалість одного табору</p>
          </li>
        </ul>
        <p className={css.text}>
          Це команда, яка працює з 2020 року, та не планує зупинятися.
        </p>
      </div>
    </>
  );
}
