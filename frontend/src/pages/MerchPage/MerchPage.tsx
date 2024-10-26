import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// import RegisterForm from "../../components/AuthForm/RegisterForm";
// import LoginForm from "../../components/AuthForm/LoginForm";
import Loader from "../../components/Loader/Loader";
import ProductsList from "../../components/ProductsList/ProductsList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Cart from "../../components/Cart/Cart";

import { fetchAllProducts } from "../../services/merch/products";

import { AppDispatch } from "../../redux/store";
import { refreshCustomer } from "../../redux/customerAuth/operations";
import { fetchCart } from "../../redux/cart/operations";
import { selectIsRefreshing } from "../../redux/customerAuth/selectors";
import { selectIsCartOpen } from "../../redux/cart/selectors";

import css from "./MerchPage.module.css";
import { Toaster } from "react-hot-toast";

export default function MerchPage() {
  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isOpen = useSelector(selectIsCartOpen);

  useEffect(() => {
    dispatch(refreshCustomer());
    dispatch(fetchCart());
  }, [dispatch]);

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

    fetchProducts();
  }, []);

  if (isRefreshing) {
    return <Loader size="80" />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
        {products.length > 0 && <ProductsList products={products} />}
      </div>

      {isOpen && <Cart isOpen={isOpen} />}
    </>
  );
}
