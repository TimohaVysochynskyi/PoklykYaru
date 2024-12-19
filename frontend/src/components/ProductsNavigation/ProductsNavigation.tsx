import { useState } from "react";

import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CategoryType } from "../../types/Product.types";

import { InputEventType } from "../../types/common.types";

import css from "./ProductsNavigation.module.css";

type Props = {
  categories: CategoryType[];
  onInputChange: (inputValue: string) => void;
};

export default function ProductsNavigation({
  categories,
  onInputChange,
}: Props) {
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange = (event: InputEventType) => {
    const value = event.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.inputWrapper}>
          <label htmlFor="input">
            <FaSearch className={css.searchIcon} />
          </label>
          <input
            type="text"
            name="input"
            id="input"
            placeholder="Пошук"
            value={inputValue}
            onChange={handleInputChange}
            className={css.input}
          />
        </div>
        <ul className={css.list}>
          <li className={css.item}>
            <Link className={css.link} to={`/`}>
              Всі продукти
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category._id} className={css.item}>
              <Link className={css.link} to={`?category=${category.name}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
