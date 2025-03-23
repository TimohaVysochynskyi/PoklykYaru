import image1 from "../../../assets/about/1.webp";
import image2 from "../../../assets/about/2.webp";
import image3 from "../../../assets/about/3.webp";
import css from "./AboutList.module.css";

export default function AboutList() {
  return (
    <>
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.col}>
            <p className={css.text}>
              “Поклик Яру” – громадська організація, яка ставить за мету
              виховання відповідальної молоді на засадах Побратимства,
              Дисципліни та Патріотизму. Ми хочемо, щоб наша молодь не їхала
              закордон шукати кращого життя. Україна варта того, щоб саме тут
              розвиватися і будувати своє майбутнє.
            </p>
          </div>
          <div className={css.col}>
            <img src={image1} alt="Фотографія" className={css.image} />
          </div>
        </div>
        <div className={css.row}>
          <div className={css.col}>
            <img src={image2} alt="Фотографія" className={css.image} />
          </div>
          <div className={css.col}>
            <p className={css.text}>
              На нашу думку, найефективнішим та найкоротшим шляхом розбудови
              сильної держави є виховання нових національних еліт. Еліт, які не
              боятимуться брати відповідальність за Державу та ставати на чолі
              державних процесів.
            </p>
          </div>
        </div>
        <div className={css.row}>
          <div className={css.col}>
            <p className={css.text}>
              Саме на це направлені наші заходи: табір, вишколи, Покрова,
              зимовий похід, смолоскипна хода і тд. Все, що ми створюємо,
              підкріплено метою виховання відповідальної молоді. Це робота не на
              один рік. Потрібно багато часу, сил і відданості, щоб отримувати
              той результат, якого прагнемо. Але наша команда впевнено йде до
              мети, незважаючи ні на що. Бо ми — схід сонця нашої Держави.
            </p>
          </div>
          <div className={css.col}>
            <img src={image3} alt="Фотографія" className={css.image} />
          </div>
        </div>
      </div>
    </>
  );
}
