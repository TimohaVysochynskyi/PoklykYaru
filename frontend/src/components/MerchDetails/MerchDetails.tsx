import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// components
import MerchSwiper from "../MerchSwiper/MerchSwiper";
import ColorList from "../ColorList/ColorList";
import SizeList from "../SizeList/SizeList";
import AddToCart from "../toasts/AddToCart/AddToCart";

// redux
import { AppDispatch } from "../../redux/store";
import { addItem } from "../../redux/cart/operations";

// types
import { ProductType } from "../../types/Product.types";
import { CartItemType } from "../../types/Cart.types";

// styles
import css from "./MerchDetails.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type Props = {
  product: ProductType;
};

export default function MerchDetails({
  product: { _id, name, description, price, composition, images, variations },
}: Props) {
  const [color, setColor] = useState(variations.color[0]);
  const [size, setSize] = useState(variations.size[0]);

  const dispatch: AppDispatch = useDispatch();

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSize(size);
  };

  const handleAddToCart = async (cartItem: CartItemType) => {
    dispatch(addItem(cartItem))
      .unwrap()
      .then(() => {
        toast(() => <AddToCart />);
      })
      .catch((error) => toast.error(error));
  };

  if (_id == undefined) return <ErrorMessage />;

  return (
    <>
      <div className={css.container}>
        <div className={css.col}>
          <div className={css.details}>
            <p className={css.title}>Склад</p>
            <p className={css.text}>{composition}</p>
          </div>
        </div>
        <div className={css.col}>
          <MerchSwiper images={images} />
        </div>
        <div className={css.col}>
          <div className={css.details}>
            <div className={css.detailsSection}>
              <h2 className={css.title}>{name}</h2>
              <p className={css.price}>{price} UAH</p>
              <p className={css.text}>{description}</p>
            </div>
            <div className={css.detailsSection}>
              <p className={css.text}>КОЛІР: &nbsp; {color}</p>
              <ColorList
                colors={variations.color}
                active={color}
                onChange={handleColorChange}
              />
              <SizeList
                sizes={variations.size}
                active={size}
                onChange={handleSizeChange}
              />
            </div>
            <button
              type="button"
              className={css.button}
              onClick={() =>
                handleAddToCart({
                  product: _id,
                  variation: {
                    size: [size],
                    color: [color],
                  },
                  quantity: 1,
                  price: price,
                })
              }
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
