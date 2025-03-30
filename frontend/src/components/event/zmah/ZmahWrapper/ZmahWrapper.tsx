import ZmahTitleWrapper from "../ZmahTitleWrapper/ZmahTitleWrapper";
import css from "./ZmahWrapper.module.css";

export default function ZmahWrapper() {
  return (
    <>
      <div className={css.container}>
        <ZmahTitleWrapper />
        <p className={css.text}>
          Весняний Холодний Яр чекає, щоб випробувати сміливців на витривалість
          та вміння орієнтуватися на місцевості. <br />
          🧭40 км та 12 годин запеклого шляху. <br />
          Маршрут, який підкорить лише найсильніший. Будь готовим до
          випробовувань, адже в Холодному Яру ніколи не буває просто😉
        </p>
      </div>
    </>
  );
}
