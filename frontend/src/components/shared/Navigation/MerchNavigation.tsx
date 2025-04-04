import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import AuthNav from "../../merch/AuthNav/AuthNav";

import { useSelector, useDispatch } from "react-redux";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

// redux
import { openCart } from "../../../redux/cart/slice";
import { selectIsLoggedIn } from "../../../redux/customerAuth/selectors";
import { selectCart } from "../../../redux/cart/selectors";

import { appDomain } from "../../../utils/constants";

import css from "./Navigation.module.css";
import clsx from "clsx";

type Props = {
  isOpen: boolean;
};

export default function MerchNavigation({ isOpen }: Props) {
  const [cartLength, setCartLength] = useState(0);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (isLoggedIn) {
      setCartLength(cart.length);
    }
  }, [isLoggedIn, cart]);

  const handleOpenCart = async () => {
    dispatch(openCart());
  };

  return (
    <>
      <ul className={clsx(css.list, isOpen && css.listOpened)}>
        <li className={css.item}>
          <a href={`http://${appDomain}`} className={css.link}>
            Головна
          </a>
        </li>
        <li className={css.item}>
          <a href={`http://${appDomain}/help`} className={css.link}>
            Допомога
          </a>
        </li>

        {isLoggedIn ? (
          <>
            <li className={css.item}>
              <NavLink to="/profile" className={css.link}>
                Мій акаунт
              </NavLink>
            </li>
            <li className={css.item}>
              <button
                type="button"
                className={css.cartButton}
                onClick={handleOpenCart}
              >
                <PiShoppingCartSimpleFill className={css.cart} />
                <span className={css.link}>({cartLength.toString()})</span>
              </button>
            </li>
          </>
        ) : (
          <AuthNav />
        )}
      </ul>
    </>
  );
}
