import css from "./ZmahTitleWrapper.module.css";

export default function ZmahTitleWrapper() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Туристичний змаг</p>
        <div className={css.button}>Початок березня</div>
      </div>
    </>
  );
}
