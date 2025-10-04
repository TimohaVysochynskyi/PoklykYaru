import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminProductCard from "../../../components/admin/AdminProductCard/AdminProductCard";
import Loader from "../../../components/shared/Loader/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage/ErrorMessage";
import AdminProductNew from "../../../components/admin/AdminProductNew/AdminProductNew";
import AdminCategoriesManager from "../../../components/admin/AdminCategoriesManager/AdminCategoriesManager";

import { ProductType } from "../../../types/Product.types";

import {
  fetchAllProducts,
  deleteProduct,
} from "../../../services/merch/products";

import { useSelector } from "react-redux";
import { selectAdminAccessToken } from "../../../redux";

export default function AdminMerchPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [isCategoriesModal, setIsCategoriesModal] = useState(false);

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

  const handleDelete = async (id: string) => {
    if (!accessToken) return;

    try {
      await deleteProduct(id, accessToken);
      toast.success("Товар видалено");
      fetchProducts();
    } catch (error) {
      toast.error("Помилка видалення товару");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Керування мерчем</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCategoriesModal(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Категорії
          </button>
          <button
            onClick={() => setIsProductModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Додати товар
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading && <Loader size="80" />}
        {error && <ErrorMessage />}
        {products.length > 0 && (
          <>
            {products.map((product) => (
              <div key={product._id}>
                <AdminProductCard product={product} onDelete={handleDelete} />
              </div>
            ))}
          </>
        )}
      </div>

      {isProductModal && accessToken && (
        <AdminProductNew
          isOpen={isProductModal}
          handleModalClose={() => setIsProductModal(false)}
          onSave={() => {
            // Product is already created in AdminProductNew, just refresh the list
            fetchProducts();
            setIsProductModal(false);
          }}
        />
      )}

      {isCategoriesModal && (
        <AdminCategoriesManager
          isOpen={isCategoriesModal}
          onClose={() => setIsCategoriesModal(false)}
        />
      )}
    </div>
  );
}
