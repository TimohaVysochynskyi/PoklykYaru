import { useEffect, useState } from "react";
import Modal from "react-modal";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";

// components
import CartItem from "../CartItem/CartItem";
import Loader from "../../shared/Loader/Loader";

// redux
import { AppDispatch } from "../../../redux/store";
import { closeCart } from "../../../redux/cart/slice";
import { cancelPayment } from "../../../redux/payments/slice";
import { createInvoice } from "../../../redux/payments/operations";
import { selectCart } from "../../../redux/cart/selectors";
import { selectInvoice } from "../../../redux/payments/selectors";

// types
import { SendPaymentType } from "../../../types/Payments.types";
import { CartProductType } from "../../../types/Cart.types";

// styles
import css from "./Cart.module.css";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
};

export default function Cart({ isOpen }: Props) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const items = useSelector(selectCart);
  const invoice = useSelector(selectInvoice);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const newTotal = items.reduce(
      (acc: number, item: CartProductType) => acc + item.price,
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

  const handlePayment = () => {
    const cleaned: SendPaymentType = {
      orderProducts: items.map((p: CartProductType) => ({
        product: p.product,
        variation: p.variation,
        quantity: p.quantity,
        price: p.price,
      })),
      totalPrice: total,
    };

    const form = dispatch(createInvoice(cleaned)).then(() => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 2500);
    });

    toast.promise(form, {
      loading: "Формування замовлення...",
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
        {invoice !== null && <div className={css.disableModal}></div>}
        <div className={css.row}>
          <div className={css.col}>
            {items.length > 0 ? (
              <ul className={css.list}>
                {items.map((item: CartProductType) => (
                  <li key={item._id} className={css.item}>
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={css.text}>Кошик порожній</p>
            )}
          </div>
          <div className={css.col}>
            <div className={css.sideRow}>
              <p className={css.text}>Сума</p>
              <p className={css.price}>{total} UAH</p>
            </div>
            <div className={css.sideRow}>
              {invoice !== null && loading == false ? (
                <a
                  href={invoice.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.buttonDark}
                >
                  Сплатити
                </a>
              ) : (
                <button
                  className={clsx(
                    css.buttonDark,
                    loading && css.buttonIsLoading
                  )}
                  onClick={handlePayment}
                >
                  {loading ? <Loader size="20" /> : "Зробити замовлення"}
                </button>
              )}
              {invoice !== null && (
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
