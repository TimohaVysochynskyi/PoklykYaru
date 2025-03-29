import css from "./PokrovaTitleWrapper.module.css";

export default function PokrovaTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Покрова</p>
        <div className={css.button}>1 жовтня</div>
      </div>
    </>
  );
}
