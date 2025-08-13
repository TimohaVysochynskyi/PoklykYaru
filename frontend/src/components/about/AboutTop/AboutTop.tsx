import css from "./AboutTop.module.css";
import ButtonCTA from "../../shared/ButtonCTA/ButtonCTA";

export default function AboutTop() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Хто ми?</p>
        <p className={css.subtitle}>
          Ми масштабували нашу діяльність. З КОМАНДИ ростемо до РУХУ. Тому кожен
          охочий може ознайомитися з системою рівнів «Поклик Яру» і спробувати
          отримати звання Легота, Височинця та Відчайдуха.
        </p>
        <ButtonCTA
          target="blank"
          link="https://docs.google.com/forms/d/1RjXHBQWtLBUeMnhjEnP997u83JKJ9wmPg8ss4cNN5jI/viewform?edit_requested=true"
        >
          Приєднатись до руху
        </ButtonCTA>
      </div>
    </>
  );
}
