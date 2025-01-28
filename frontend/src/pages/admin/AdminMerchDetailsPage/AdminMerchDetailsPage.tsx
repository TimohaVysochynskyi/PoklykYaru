import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetails from "../../../components/admin/AdminProductDetails/AdminProductDetails";
import ProductEdit from "../../../components/admin/AdminProductEdit/AdminProductEdit";
import Loader from "../../../components/shared/Loader/Loader";

import {
  fetchProductWithId,
  updateProductWithId,
} from "../../../services/merch/products";

import { ProductType } from "../../../types/Product.types";

import { selectAccessToken } from "../../../redux/adminAuth/selectors";

export default function AdminMerchEditPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const accessToken = useSelector(selectAccessToken);

  const fetchProduct = (productId: string) => {
    fetchProductWithId(productId)
      .then((response) => setProduct(response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <>
      {loading && <Loader size="80" />}
      {product && productId && (
        <div className="px-4 sm:px-0">
          <div className="flex items-center">
            <button
              onClick={handleEditToggle}
              className="bg-neutral-0 border-2 border-black px-5 py-1.5 text-l font-medium transition text-neutral-800 rounded hover:bg-neutral-800 hover:text-neutral-50"
            >
              {isEditing ? "Відмінити" : "Редагувати"}
            </button>
          </div>

          {isEditing && accessToken ? (
            <ProductEdit
              product={product}
              onSave={(updatedProduct) => {
                updateProductWithId(
                  productId,
                  updatedProduct,
                  accessToken
                ).then(() => fetchProduct(productId));
                setIsEditing(false);
              }}
            />
          ) : (
            <ProductDetails product={product} />
          )}
        </div>
      )}
    </>
  );
}
