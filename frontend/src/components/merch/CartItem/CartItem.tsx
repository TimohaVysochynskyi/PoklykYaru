import { useState } from "react";
import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

// components
import SizeDropdown from "../SizeDropdown/SizeDropdown";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteItem, updateItem } from "../redux";

// types
import { CartProductType } from "../../../types/Cart.types";

// styles
import css from "./CartItem.module.css";
import ColorList from "../ColorList/ColorList";

type Props = {
  item: CartProductType;
};

export default function CartItem({
  item,
  item: { variation, quantity, productData },
}: Props) {
  const [size, setSize] = useState(variation.size[0]);
  const [color, setColor] = useState(variation.color[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  //const dispatch: AppDispatch = useDispatch();

  const handleChangeSize = (size: string) => {
    setSize(size);
    setShowDropdown(false);
    const newVariation = {
      size: [size],
      color: variation.color,
    };
    dispatch(updateItem({ ...item, action: "size", newVariation }));
  };

  const handleChangeColor = (color: string) => {
    setColor(color);
    const newVariation = {
      size: variation.size,
      color: [color],
    };
    dispatch(updateItem({ ...item, action: "color", newVariation }));
  };

  const handleShowDropdown = (showDropdown: boolean) => {
    if (showDropdown == true) setShowDropdown(false);
    else setShowDropdown(true);
  };

  const handleDelete = (item: CartProductType) => {
    dispatch(deleteItem(item));
  };

  const handleQuantityUpdate = (item: CartProductType, action: string) => {
    dispatch(updateItem({ ...item, action }));
  };

  const quantityButtonClass = clsx(
    css.quantityButton,
    quantity <= 1 && css.quantityButtonSecondary
  );

  return (
    <>
      <div className={css.container}>
        <img
          src={`http://${productData.images[0]}`}
          alt="Картинка"
          className={css.image}
        />
        <div className={css.content}>
          <div className={css.col}>
            <p className={css.name}>{productData.name}</p>
            <p className={css.description}>{productData.description}</p>
            <div className={css.variation}>
              <div className={css.size}>
                <button
                  className={clsx(
                    css.sizeButton,
                    showDropdown && css.sizeButtonOpened
                  )}
                  onClick={() => handleShowDropdown(showDropdown)}
                >
                  {size}
                  {showDropdown ? (
                    <IoIosArrowUp className={css.arrow} />
                  ) : (
                    <IoIosArrowDown className={css.arrow} />
                  )}
                </button>
                {showDropdown && (
                  <SizeDropdown
                    sizeSelection={handleChangeSize}
                    sizes={productData.variations.size}
                    selectedSize={size}
                  />
                )}
              </div>
              <div>
                <ColorList
                  colors={productData.variations.color}
                  active={color}
                  onChange={handleChangeColor}
                />
              </div>
            </div>
          </div>
          <div className={css.col}>
            <p className={css.price}>{productData.price} UAH</p>
          </div>
          <div className={css.col}>
            <div className={css.quantityWrapper}>
              <button
                type="button"
                disabled={quantity <= 1}
                className={quantityButtonClass}
                onClick={() => handleQuantityUpdate(item, "decrement")}
              >
                <FaMinus className={css.quantityActionCharacter} />
              </button>
              <span className={css.quantity}>{quantity}</span>
              <button
                type="button"
                className={css.quantityButton}
                onClick={() => handleQuantityUpdate(item, "increment")}
              >
                <FaPlus className={css.quantityActionCharacter} />
              </button>
            </div>
            <button
              type="button"
              className={css.deleteButton}
              onClick={() => handleDelete(item)}
            >
              <MdClose className={css.delete} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
