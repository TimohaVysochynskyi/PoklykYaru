import { useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

// redux
import { AppDispatch } from "../../../redux/store";
import { openCart } from "../../../redux/cart/slice";

import css from "./AddToCart.module.css";

export default function AddToCart() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div className={css.toastWrapper}>
        <p className={css.toastText}> Товар додано </p>
        <button onClick={() => dispatch(openCart())} className={css.cartButton}>
          <AiOutlineShoppingCart className={css.cart} />
        </button>
      </div>
    </>
  );
}
