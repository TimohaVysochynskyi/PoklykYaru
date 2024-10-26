import ProductCard from "../ProductCard/ProductCard";

import { ProductType } from "../../types/Product.types";

import css from "./ProductsList.module.css";

type Props = {
  products: Array<ProductType>;
};

export default function ProductsList({ products }: Props) {
  return (
    <>
      <div className={css.container}>
        <ul className={css.list}>
          {products.map((product) => (
            <li className={css.item} key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
