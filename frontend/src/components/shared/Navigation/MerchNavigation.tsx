import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import AuthNav from "../../merch/AuthNav/AuthNav";

import { useSelector, useDispatch } from "react-redux";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

// redux
import { openCart } from "../redux";
import { selectIsLoggedIn } from "../redux";
import { selectCart } from "../redux";

import { Link } from "react-router-dom";

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
          <Link to="/" className={css.link}>
            Головна
          </Link>
        </li>
        <li className={css.item}>
          <Link to="/merch/help" className={css.link}>
            Допомога
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className={css.item}>
              <NavLink to="/merch/profile" className={css.link}>
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
