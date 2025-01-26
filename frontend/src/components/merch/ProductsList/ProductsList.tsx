import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductsNavigation from "../ProductsNavigation/ProductsNavigation";

import { CategoryType, ProductType } from "../../../types/Product.types";

import css from "./ProductsList.module.css";

type Props = {
  categories: CategoryType[];
  products: ProductType[];
};

export default function ProductsList({ categories, products }: Props) {
  const [visibleProducts, setVisibleProducts] =
    useState<ProductType[]>(products);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    // Фільтруємо продукти за категорією та пошуком
    const filteredProducts = products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch = searchValue
        ? product.name.toLowerCase().includes(searchValue.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });

    setVisibleProducts(filteredProducts);
  }, [category, searchValue, products]);

  const handleSearch = (inputValue: string) => {
    setSearchValue(inputValue); // Змінюємо значення пошуку
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
