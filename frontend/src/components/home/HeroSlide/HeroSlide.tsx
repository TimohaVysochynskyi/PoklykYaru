import clsx from "clsx";
import css from "./HeroSlide.module.css";

type Props = {
  name: string;
  title: string;
  isHiDPI?: boolean;
  isActive: boolean;
  transitionDuration: number;
};

export default function HeroSlide({
  name,
  title,
  isHiDPI = false,
  isActive,
  transitionDuration,
}: Props) {
  // Some slides may not have a layer image
  const hasLayer = name !== "molod";

  return (
    <div
      className={clsx(
        css.container,
        isHiDPI && css.dprScaled,
        isActive && css.active
      )}
      style={{
        transitionDuration: `${transitionDuration}ms`,
      }}
    >
      <img
        src={`/hero/${name}.webp`}
        alt=""
        className={css.bgImage}
        loading={isActive ? "eager" : "lazy"}
        decoding="async"
      />
      <div
        className={clsx(css.bgFilter, name === "vatra" && css.noBgFilter)}
      ></div>
      {hasLayer && (
        <img
          src={`/hero/${name}-layer.webp`}
          alt=""
          className={css.layer}
          loading={isActive ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      <div className={css.titleWrapper}>
        <h1 className={css.title}>Поклик Яру - </h1>
        <p className={css.subtitle}>це {title}</p>
      </div>
    </div>
  );
}
