import { ProductType } from "../../../types/Product.types";
import AdminImageField from "../AdminImageField/AdminImageField";

interface Props {
  product: ProductType;
}

export default function ProductDetails({
  product: {
    name,
    description,
    price,
    category,
    stock,
    composition,
    images,
    variations,
  },
}: Props) {
  const staticProductData = [
    { name: "Назва", value: name },
    { name: "Категорія", value: category },
    { name: "Ціна", value: price },
    { name: "Кількість на складі", value: stock },
    { name: "Опис", value: description },
    { name: "Склад", value: composition },
  ];

  const sizes = variations.size;
  const colors = variations.color;

  return (
    <>
      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {staticProductData.map(({ name, value }) => (
            <div
              key={name}
              className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm my-2 font-medium text-gray-900">{name}</dt>
              <dd className="text-sm my-2 text-gray-700 sm:col-span-2">
                {value}
              </dd>
            </div>
          ))}

          <div
            key="sizes"
            className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          >
            <dt className="text-sm my-2 font-medium text-gray-900">Розміри</dt>
            <dd className="text-sm my-2 text-gray-700 sm:col-span-2 flex items-center gap-x-4">
              {sizes.map((size) => (
                <div key={size}>{size}</div>
              ))}
            </dd>
          </div>
          <div
            key="colors"
            className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          >
            <dt className="text-sm my-2 font-medium text-gray-900">Кольори</dt>
            <dd className="text-sm my-2 text-gray-700 sm:col-span-2 flex gap-x-4">
              {colors.map((color) => (
                <div className="flex items-center" key={color}>
                  <div
                    className="w-6 h-6 border-2 border-black"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="ml-2">{color}</span>
                </div>
              ))}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Картинки</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {images.map((image) => (
                  <li
                    key={image}
                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm"
                  >
                    <AdminImageField image={image} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
