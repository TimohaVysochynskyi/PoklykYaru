import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
// import RegisterForm from "../../components/AuthForm/RegisterForm";
// import LoginForm from "../../components/AuthForm/LoginForm";
import Loader from "../../components/shared/Loader/Loader";
import ProductsList from "../../components/merch/ProductsList/ProductsList";
import ErrorMessage from "../../components/shared/ErrorMessage/ErrorMessage";
import Cart from "../../components/merch/Cart/Cart";

import {
  fetchAllCategories,
  fetchAllProducts,
} from "../../services/merch/products";

// redux
import { AppDispatch } from "../../redux/store";
import { refreshCustomer } from "../../redux/customerAuth/operations";
import { fetchCart } from "../../redux/cart/operations";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/customerAuth/selectors";
import { selectIsCartOpen } from "../../redux/cart/selectors";

// types
import { CategoryType, ProductType } from "../../types/Product.types";

// styles
import css from "./MerchPage.module.css";

export default function MerchPage() {
  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isCartOpen = useSelector(selectIsCartOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshCustomer());
    if (isLoggedIn) dispatch(fetchCart());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchAllProducts();
        setProducts(response.data);
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    async function fetchCategories() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchAllCategories();
        setCategories(response.data);
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    fetchCategories();
  }, []);

  if (isRefreshing) {
    return <Loader size="80" />;
  }

  return (
    <>
      <section className={css.head}>
        <h1 className={css.title}>
          <span>Мерч</span> відповідальних
        </h1>
        <p className={css.text}>
          Одяг перестав бути беззмiстовними клаптиками матерiалу. Зараз це
          вiдображення світогляду та способу життя людини. Тож якщо ти
          поціновувач iсторiї, символізму та якісного мерчу, тут ти знайдеш все,
          чого шукав.
        </p>
      </section>
      {/* <RegisterForm />
      <LoginForm /> */}
      <div className={css.merchWrapper}>
        {loading && <Loader size="80" />}
        {error && <ErrorMessage />}
        {products.length > 0 && (
          <ProductsList categories={categories} products={products} />
        )}
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} />}
    </>
  );
}
