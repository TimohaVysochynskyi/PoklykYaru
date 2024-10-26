import { useEffect, useState } from "react";
import clsx from "clsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import Loader from "../Loader/Loader";
import SizeDropdown from "../SizeDropdown/SizeDropdown";

import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../../redux/cart/operations";

import { fetchProductWithId } from "../../services/merch/products";

import { ProductType, CartItemType } from "../../types/Product.types";

import css from "./CartItem.module.css";

type Props = {
  item: CartItemType;
};

export default function CartItem({
  item,
  item: { product, variation, quantity },
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [size, setSize] = useState(variation.size[0]);
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

  const handleShowDropdown = (showDropdown: boolean) => {
    if (showDropdown == true) setShowDropdown(false);
    else setShowDropdown(true);
  };

  const handleDelete = (item: CartItemType) => {
    dispatch(deleteItem(item));
  };

  const handleQuantityUpdate = (item: CartItemType, action: string) => {
    dispatch(updateItem({ ...item, action }));
  };

  const quantityButtonClass = clsx(
    css.quantityButton,
    quantity <= 1 && css.quantityButtonSecondary
  );

  useEffect(() => {
    async function fetchProduct(productId: string) {
      try {
        const response = await fetchProductWithId(productId);
        setSelectedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct(product);
  }, [product]);

  if (!selectedProduct) {
    return <Loader />; // Поки дані не завантажені, показуємо повідомлення про завантаження
  }

  return (
    <>
      <div className={css.container}>
        <img
          src={`http://${selectedProduct.images[0]}`}
          alt="Картинка"
          className={css.image}
        />
        <div className={css.content}>
          <div className={css.col}>
            <p className={css.name}>{selectedProduct.name}</p>
            <p className={css.description}>{selectedProduct.description}</p>
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
                    sizes={selectedProduct.variations.size}
                    selectedSize={size}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={css.col}>
            <p className={css.price}>{selectedProduct.price} UAH</p>
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
