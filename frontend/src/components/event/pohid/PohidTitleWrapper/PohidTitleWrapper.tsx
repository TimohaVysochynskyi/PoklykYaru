import css from "./PohidTitleWrapper.module.css";

export default function PohidTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Зимовий похід</p>
        <div className={css.button}>Перші вихідні грудня</div>
      </div>
    </>
  );
}
