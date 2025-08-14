import { useEffect, useState } from "react";
import AdminProductCard from "../../../components/admin/AdminProductCard/AdminProductCard";
import Loader from "../../../components/shared/Loader/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage/ErrorMessage";
import { FaCirclePlus } from "react-icons/fa6";
import AdminProductNew from "../../../components/admin/AdminProductNew/AdminProductNew";

import { ProductType } from "../../../types/Product.types";

import { addProduct, fetchAllProducts } from "../../../services/merch/products";

import { useSelector } from "react-redux";
import { selectAdminAccessToken } from "../../../redux";

export default function AdminMerchPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const accessToken = useSelector(selectAdminAccessToken);

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleModal = () => {
    return isModal ? setIsModal(false) : setIsModal(true);
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading && <Loader size="80" />}
        {error && <ErrorMessage />}
        {products.length > 0 && (
          <>
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <AdminProductCard product={product} />
              </div>
            ))}
          </>
        )}
        <button
          onClick={handleModal}
          className="btn w-20 fixed bottom-20 right-20"
        >
          <FaCirclePlus className="w-full h-full text-gray-800" />
        </button>
        {isModal && accessToken && (
          <>
            <AdminProductNew
              isOpen={isModal}
              handleModalClose={handleModal}
              onSave={(updatedProduct: ProductType) => {
                addProduct(updatedProduct, accessToken).then(() =>
                  fetchProducts()
                );
                setIsModal(false);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
