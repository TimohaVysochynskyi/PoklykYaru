import clsx from "clsx";
import css from "./HeroSlide.module.css";

type Props = {
  name: string;
  title: string;
};
export default function HeroSlide({ name, title }: Props) {
  return (
    <>
      <div
        className={css.container}
        style={{ backgroundImage: `url('../../src/assets/hero/${name}.webp')` }}
      >
        <div
          className={clsx(css.bgFilter, name == "vatra" && css.noBgFilter)}
        ></div>
        <div
          className={css.layer}
          style={{
            backgroundImage: `url('../../src/assets/hero/${name}-layer.webp')`,
          }}
        ></div>
        <div className={css.titleWrapper}>
          <p className={css.title}>Поклик Яру - </p>
          <p className={css.subtitle}>це {title}</p>
        </div>
      </div>
    </>
  );
}
