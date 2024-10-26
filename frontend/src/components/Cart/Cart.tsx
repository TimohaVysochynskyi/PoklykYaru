import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";

import CartItem from "../CartItem/CartItem";

import { AppDispatch } from "../../redux/store";
import { selectCart } from "../../redux/cart/selectors";
import { closeCart } from "../../redux/cart/slice";
import { paymentForm } from "../../redux/payments/operations";

import { SendPaymentType } from "../../types/Payments.types";
import { CartItemType } from "../../types/Product.types";

import css from "./Cart.module.css";
import { selectPaymentFormData } from "../../redux/payments/selectors";
import Loader from "../Loader/Loader";
import clsx from "clsx";
import { cancelPayment } from "../../redux/payments/slice";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
};

export default function Cart({ isOpen }: Props) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const items = useSelector(selectCart);
  const paymentFormData = useSelector(selectPaymentFormData);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const newTotal = items.reduce(
      (acc: number, item: CartItemType) => acc + item.price,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const handleCartClose = () => {
    dispatch(closeCart());
    handleCancelPayment();
  };
  const handleCancelPayment = () => {
    dispatch(cancelPayment());
    setLoading(false);
  };

  const handlePayment = (sendPayment: SendPaymentType) => {
    const form = dispatch(paymentForm(sendPayment)).then(() => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2500);
    });

    toast.promise(form, {
      loading: "Saving...",
      success: <p className={css.toastText}>Замовлення сформоване!</p>,
      error: <p className={css.toastText}>Не вдалося сформувати замовлення.</p>,
    });
  };

  return (
    <>
      <Modal
        className={css.modal}
        overlayClassName={css.overlay}
        isOpen={isOpen}
        onRequestClose={handleCartClose}
      >
        <div className={css.row}>
          <h2 className={css.title}>Кошик</h2>
          <button
            type="button"
            onClick={handleCartClose}
            className={css.closeButton}
          >
            <IoCloseOutline className={css.close} />
          </button>
        </div>
        {paymentFormData !== null && <div className={css.disableModal}></div>}
        <div className={css.row}>
          <div className={css.col}>
            <ul className={css.list}>
              {items.map((item: CartItemType) => (
                <li key={item.product} className={css.item}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          </div>
          <div className={css.col}>
            <div className={css.sideRow}>
              <p className={css.text}>Сума</p>
              <p className={css.price}>{total} UAH</p>
            </div>
            {/* <div className={css.sideRow}>
              <p className={css.text}>Додати коментар до замовення</p>
              <button type="button" className={css.arrowButton}>
                <IoIosArrowDown className={css.arrow} />
              </button>
            </div> */}
            <div className={css.sideRow}>
              {paymentFormData !== null && loading == false ? (
                <form
                  action="https://www.liqpay.ua/api/3/checkout"
                  accept-charset="utf-8"
                  className={css.form}
                >
                  <input
                    type="hidden"
                    name="data"
                    value={paymentFormData.data}
                  />
                  <input
                    type="hidden"
                    name="signature"
                    value={paymentFormData.signature}
                  />
                  <button type="submit" className={css.buttonDark}>
                    Сплатити
                  </button>
                </form>
              ) : (
                <button
                  className={clsx(
                    css.buttonDark,
                    loading && css.buttonIsLoading
                  )}
                  onClick={() =>
                    handlePayment({ orderProducts: items, totalPrice: total })
                  }
                >
                  {loading ? <Loader size="20" /> : "Зробити замовлення"}
                </button>
              )}
              {paymentFormData !== null && (
                <button
                  className={css.buttonLight}
                  onClick={handleCancelPayment}
                >
                  Переглянути кошик
                </button>
              )}
              <button className={css.buttonLight} onClick={handleCartClose}>
                Продовжити покупки
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
