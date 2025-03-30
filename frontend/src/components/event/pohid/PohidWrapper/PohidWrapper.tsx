import PohidTitleWrapper from "../PohidTitleWrapper/PohidTitleWrapper";
import css from "./PohidWrapper.module.css";

export default function PohidWrapper() {
  return (
    <>
      <div className={css.container}>
        <PohidTitleWrapper />
        <p className={css.text}>
          Наша команда, надихнувшись романом «Холодний Яр», вирішує традиційно
          проводити зимовий похід. І не просто похід, а втілити маршрути
          Горліс-Горського, які він описав в книзі. <br />
          Тому пропонуємо вам формулу, що стане ідеальним завершенням цього
          року: <br />
          Прочитати «Холодний Яр» Юрія Горліс-Горського ➕ Пройти зимовий похід,
          де враження від прочитаної книги наживо підкріплені красою зимового
          Холодного Яру.
        </p>
      </div>
    </>
  );
}
