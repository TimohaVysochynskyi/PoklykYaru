import css from "./SizeDropdown.module.css";

type Props = {
  sizeSelection: (size: string) => void;
  sizes: Array<string>;
  selectedSize: string;
};

export default function SizeDropdown({
  sizeSelection,
  sizes,
  selectedSize,
}: Props) {
  const filteredSizes = sizes.filter((size) => size !== selectedSize);

  return (
    <>
      <ul className={css.list}>
        {filteredSizes.map((size: string) => (
          <li key={size} className={css.item}>
            <button
              type="button"
              onClick={() => sizeSelection(size)}
              className={css.button}
            >
              {size}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
