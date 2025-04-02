import valuesImage from "../../../assets/values/values.webp";
import firstImage from "../../../assets/values/disciplina.webp";
import secondImage from "../../../assets/values/patriotysm.webp";
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
          <p className={css.text}>Побратимство. Дисципліна. Патріотизм </p>
          <p className={css.text}>
            За кожним словом стоїть система виховання, лекцій, пояснень та дій.
            Важливо все, навіть порядок слів.
          </p>
          <p className={css.text}>
            <span>Побратимство</span> означає підтримку та взаємодопомогу. Суть
            чудово передає гасло: "Один за всіх і всі за одного!". Без
            побратимства інші цінності нічого не варті, тому стоїть на першому
            місці.
          </p>
          <p className={css.text}>
            <span>Дисципліна</span> – основа будь-якого порядку. Без неї
            виховання зводиться нанівець, а будь-яке заняття перетворюється на
            хаос. Дисципліна структуризує всю роботу і допомагає чітко слідувати
            до виконання мети.
          </p>
          <p className={css.text}>
            <span>Патріотизм</span> – риса відповідальної нації. Це повага та
            відданість рідній країні. Без виконання перших двох цінностей, не
            можна говорити про любов до України. Щоб досягти чогось високого,
            треба почати із взаємопідтримки і самодисципліни.
          </p>
          <p className={css.text}>
            Усі цінності виховуються роками. Риси характеру викарбовуються
            власним бажанням стати краще. Ми переконані, що патріотична і
            дисциплінована молодь, що підтримує один одного, не боїться брати
            відповідальність, беззаперечно стане міцним фундаментом нового
            українського суспільства, що невпинно вестиме державу до
            процвітання.
          </p>
          <div className={css.imagesWrapper}>
            <img
              src={firstImage}
              alt="Зображення цінності"
              className={css.image}
            />
            <img
              src={secondImage}
              alt="Зображення цінності"
              className={css.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
