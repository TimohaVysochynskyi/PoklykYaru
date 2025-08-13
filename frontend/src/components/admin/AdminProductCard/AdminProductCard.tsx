import { Link, useLocation } from "react-router-dom";
import { ProductType } from "../../../types/Product.types";

type Props = {
  product: ProductType;
};

export default function AdminProductCard({ product }: Props) {
  const location = useLocation();

  return (
    <Link to={`./${product._id}`} state={location}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 cursor-pointer">
        <img
          alt="Картинка товару"
          src={`http://${product.images[0]}`}
          className="h-full w-full object-cover object-top lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price} UAH</p>
      </div>
    </Link>
  );
}
