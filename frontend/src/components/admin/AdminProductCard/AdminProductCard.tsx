import { Link, useLocation } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { ProductType } from "../../../types/Product.types";

type Props = {
  product: ProductType;
  onDelete: (id: string) => void;
};

export default function AdminProductCard({ product, onDelete }: Props) {
  const location = useLocation();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Видалити товар "${product.name}"?`)) {
      if (product._id) {
        onDelete(product._id);
      }
    }
  };

  // Image URL from Cloudinary (already full URL)
  const imageUrl = product.images[0] || "";

  return (
    <div className="relative group">
      <Link to={`./${product._id}`} state={location}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-85 lg:h-80 cursor-pointer">
          <img
            alt={product.name}
            src={imageUrl}
            className="h-full w-full object-cover object-top lg:h-full lg:w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {product.price} UAH
          </p>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-opacity z-10"
        title="Видалити товар"
        aria-label={`Видалити товар ${product.name}`}
      >
        <IoTrashOutline className="h-5 w-5" />
      </button>
    </div>
  );
}
