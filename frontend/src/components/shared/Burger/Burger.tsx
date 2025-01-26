import clsx from "clsx";
import css from "./Burger.module.css";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function Burger({ isOpen, onClick }: Props) {
  return (
    <>
      <div className={clsx(css.container, "burger")} onClick={onClick}>
        <div className={clsx(css.line, isOpen && css.crossLine)}></div>
        {!isOpen && <div className={css.line}></div>}
        <div className={clsx(css.line, isOpen && css.crossLine)}></div>
      </div>
    </>
  );
}
