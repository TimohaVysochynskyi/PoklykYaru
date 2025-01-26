import css from "./ColorList.module.css";

type Props = {
  colors: string[];
  active: string;
  onChange: (color: string) => void;
};

export default function ColorList({ colors, active, onChange }: Props) {
  return (
    <>
      <ul className={css.list}>
        {colors.map((color) => (
          <li key={color} className={css.item}>
            <div
              className={css.color}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
            ></div>
            {color == active && <div className={css.line}></div>}
          </li>
        ))}
      </ul>
    </>
  );
}
