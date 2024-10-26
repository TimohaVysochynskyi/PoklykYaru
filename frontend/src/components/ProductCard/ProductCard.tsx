import { useState } from "react";
import clsx from "clsx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";

import SizeDropdown from "../SizeDropdown/SizeDropdown";

import { addItem } from "../../redux/cart/operations";
import { AppDispatch } from "../../redux/store";
import { CartItemType, ProductType } from "../../types/Product.types";

import css from "./ProductCard.module.css";
import toast from "react-hot-toast";
import { openCart } from "../../redux/cart/slice";
import { Link, useLocation } from "react-router-dom";

type Props = {
  product: ProductType;
};

export default function ProductCard({
  //product,
  product: { _id, name, images, price, variations },
}: Props) {
  const [size, setSize] = useState(variations.size[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  const handleChangeSize = (size: string) => {
    setSize(size);
    setShowDropdown(false);
  };

  const handleShowDropdown = (showDropdown: boolean) => {
    if (showDropdown == true) setShowDropdown(false);
    else setShowDropdown(true);
  };

  const handleAddToCart = async (cartItem: CartItemType) => {
    dispatch(addItem(cartItem)).then(() => {
      toast(() => (
        <div className={css.toastWrapper}>
          <p className={css.toastText}>Товар додано</p>
          <button
            onClick={() => dispatch(openCart())}
            className={css.cartButton}
          >
            <AiOutlineShoppingCart className={css.cart} />
          </button>
        </div>
      ));
    });
  };

  return (
    <>
      <div className={css.container}>
        <Link to={`/${_id}`} state={location} className={css.link}>
          <img
            src={`http://${images[0]}`}
            alt="Картинка"
            className={css.image}
          />
        </Link>
        <div className={css.description}>
          <p className={css.name}>{name}</p>
          <div className={css.row}>
            <div className={css.priceWrapper}>
              <span className={css.price}>{price} UAH</span>
            </div>
            <div className={css.col}>
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
                    sizes={variations.size}
                    selectedSize={size}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleAddToCart({
                    product: _id,
                    variation: {
                      size: [size],
                      color: [variations.color[0]],
                    },
                    quantity: 1,
                    price: price,
                  })
                }
                className={css.cartButton}
              >
                <AiOutlineShoppingCart className={css.cart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
