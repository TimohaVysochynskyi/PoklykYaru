import css from "./AboutTop.module.css";

export default function AboutTop() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>Хто ми?</p>
        <p className={css.subtitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vel vero
          saepe quasi ex quo ducimus maxime laudantium enim quae velit eaque
          eveniet, tenetur debitis. Nobis blanditiis impedit enim reprehenderit!
        </p>
        <button className={css.button}>Приєднатись до команди</button>
      </div>
    </>
  );
}
