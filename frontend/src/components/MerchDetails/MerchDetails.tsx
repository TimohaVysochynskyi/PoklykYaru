import { useState } from "react";

// components
import MerchSwiper from "../MerchSwiper/MerchSwiper";
import ColorList from "../ColorList/ColorList";
import SizeList from "../SizeList/SizeList";

// types
import { ProductType } from "../../types/Product.types";

// styles
import css from "./MerchDetails.module.css";

type Props = {
  product: ProductType;
};

export default function MerchDetails({
  product: { name, description, price, composition, images, variations },
}: Props) {
  const [color, setColor] = useState(variations.color[0]);
  const [size, setSize] = useState(variations.size[0]);

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSize(size);
  };

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
              <p className={css.text}>КОЛІР: &nbsp; {variations.color[0]}</p>
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
            <button type="button" className={css.button}>
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
