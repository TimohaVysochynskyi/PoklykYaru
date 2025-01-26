import clsx from "clsx";

import css from "./SizeList.module.css";

type Props = {
  sizes: string[];
  active: string;
  onChange: (size: string) => void;
};
export default function SizeList({ sizes, active, onChange }: Props) {
  return (
    <>
      <ul className={css.list}>
        {sizes.map((size) => (
          <li key={size} className={css.item}>
            <div
              className={clsx(css.size, active == size && css.active)}
              onClick={() => onChange(size)}
            >
              {size}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
