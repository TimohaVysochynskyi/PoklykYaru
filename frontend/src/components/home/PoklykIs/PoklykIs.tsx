import Numbers from "../Numbers/Numbers";
// import { HiMiniArrowUpRight } from "react-icons/hi2";
// import { Link } from "react-router-dom";
// import tabir from "../../../assets/numbers/tabir.png";
// import hoda from "../../../assets/numbers/hoda.png";
// import pokrova from "../../../assets/numbers/pokrova.png";
import css from "./PoklykIs.module.css";

export default function PoklykIs() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>
          Поклик Яру <span className={css.subtitle}>—</span>
          <span className={css.subtitle}>це</span>
        </h2>
        <Numbers />
        {/* <div className={css.imagesWrapper}>
          <img src={tabir} alt="Картинка" className={css.image} />
          <img src={hoda} alt="Картинка" className={css.image} />
          <img src={pokrova} alt="Картинка" className={css.image} />
          <div className={css.gradient}>
            <Link to="/gallery" className={css.text}>
              Всі фотографії
              <HiMiniArrowUpRight className={css.arrow} />
            </Link>
          </div>
        </div> */}
      </div>
    </>
  );
}
