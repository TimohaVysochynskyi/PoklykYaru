import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import Loader from "../../components/Loader/Loader";
import MerchDetails from "../../components/MerchDetails/MerchDetails";

import { fetchProductWithId } from "../../services/merch/products";

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

  useEffect(() => {
    if (productId) {
      fetchProductWithId(productId)
        .then((response) => {
          setProduct(response.data);
        })
        .finally(() => setLoading(false));
    }
  }, [productId]);

  return (
    <>
      {loading && <Loader size="80" />}
      {product !== null && (
        <section className={css.dataWrapper}>
          <MerchDetails product={product} />
        </section>
      )}
    </>
  );
}
