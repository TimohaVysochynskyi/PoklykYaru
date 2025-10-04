import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductsNavigation from "../ProductsNavigation/ProductsNavigation";

import { CategoryType, ProductType } from "../../../types/Product.types";

import css from "./ProductsList.module.css";

type Props = {
  categories: CategoryType[];
  products: ProductType[];
};

export default function ProductsList({ categories, products }: Props) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [searchValue, setSearchValue] = useState<string>("");

  // Use useMemo for derived state instead of useEffect
  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch = searchValue
        ? product.name.toLowerCase().includes(searchValue.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [category, searchValue, products]);

  const handleSearch = (inputValue: string) => {
    setSearchValue(inputValue);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.nav}>
          <ProductsNavigation
            categories={categories}
            onInputChange={handleSearch}
          />
        </div>
        <ul className={css.list}>
          {visibleProducts.map((product) => (
            <li className={css.item} key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
