import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

// components
import SizeDropdown from "../SizeDropdown/SizeDropdown";
import AddToCart from "../../toasts/AddToCart/AddToCart";

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addItem, selectIsLoggedIn } from "../../../redux";

// types
import { ProductType } from "../../../types/Product.types";
import { CartItemType } from "../../../types/Cart.types";

// styles
import css from "./ProductCard.module.css";
import { useSelector } from "react-redux";

type Props = {
  product: ProductType;
};

export default function ProductCard({
  product: { _id, name, images, price, variations },
}: Props) {
  const [size, setSize] = useState(variations.size[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  const handleChangeSize = (size: string) => {
    setSize(size);
    setShowDropdown(false);
  };

  const handleShowDropdown = (showDropdown: boolean) => {
    setShowDropdown(!showDropdown);
  };

  const handleAddToCart = async (cartItem: CartItemType) => {
    dispatch(addItem(cartItem))
      .unwrap()
      .then(() => {
        toast(() => <AddToCart />);
      })
      .catch((err: unknown) => toast.error(String(err)));
  };

  // Image URL from Cloudinary (already full URL)
  const imageUrl = images[0] || "";

  return (
    <div className={css.container}>
      <Link to={`./${_id}`} state={location} className={css.link}>
        <img
          src={imageUrl}
          alt={name}
          className={css.image}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className={css.description}>
        <p className={css.name}>{name}</p>
        <div className={css.row}>
          <div className={css.priceWrapper}>
            <span className={css.price}>{price} UAH</span>
          </div>
          {isLoggedIn && _id && (
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
          )}
        </div>
      </div>
    </div>
  );
}
