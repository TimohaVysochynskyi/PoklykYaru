import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Loader from "../../components/shared/Loader/Loader";
import MerchDetails from "../../components/merch/MerchDetails/MerchDetails";
import Cart from "../../components/merch/Cart/Cart";

import { fetchProductWithId } from "../../services/merch/products";

// redux
import { AppDispatch } from "../../redux/store";
import { refreshCustomer } from "../../redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux";
import { fetchCart } from "../../redux";
import { selectIsCartOpen } from "../../redux";

// types
import { ProductType } from "../../types/Product.types";

// styles
import css from "./MerchDetailsPage.module.css";

type Params = {
  productId: string | undefined;
};

export default function MerchDetailsPage() {
  const { productId } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  const isCartOpen = useSelector(selectIsCartOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshCustomer());
    if (isLoggedIn) dispatch(fetchCart());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (productId) {
      fetchProductWithId(productId)
        .then((response) => {
          setProduct(response.data);
        })
        .finally(() => setLoading(false));
    }
  }, [productId]);

  if (isRefreshing) {
    return <Loader size="80" />;
  }

  return (
    <>
      {loading && <Loader size="80" />}
      {product !== null && (
        <section className={css.dataWrapper}>
          <MerchDetails product={product} />
        </section>
      )}

      {isCartOpen && <Cart isOpen={isCartOpen} />}
    </>
  );
}
