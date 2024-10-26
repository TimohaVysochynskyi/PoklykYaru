import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductWithId } from "../../services/merch/products";
import { ProductType } from "../../types/Product.types";

import css from "./MerchDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

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
      <div className={css.container}>
        {product !== null && <div className={css.dataWrapper}></div>}
      </div>
    </>
  );
}
