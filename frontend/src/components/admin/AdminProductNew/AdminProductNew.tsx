import React, { useState } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { setAuthHeader } from "../../../services/merch";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../redux/adminAuth/selectors";
import axios from "axios";
import { ProductType } from "../../../types/Product.types";

Modal.setAppElement("#root");

interface Variations {
  size: string[];
  color: string[];
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  composition: string;
  category: string;
  images: File[];
  variations: Variations;
  stock: number;
}

type Props = {
  isOpen: boolean;
  handleModalClose: () => void;
  onSave: (updatedProduct: ProductType) => void;
};

export default function CreateProduct({
  isOpen,
  handleModalClose,
  onSave,
}: Props) {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    composition: "",
    category: "",
    images: [],
    variations: { size: [], color: [] },
    stock: 0,
  });

  const accessToken = useSelector(selectAccessToken);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleVariationsChange = (
    type: keyof Variations, // Замість "size" | "color"
    value: string,
    index: number
  ) => {
    setProductData((prev) => {
      const updatedVariations = [...prev.variations[type]];
      updatedVariations[index] = value;
      return {
        ...prev,
        variations: {
          ...prev.variations,
          [type]: updatedVariations,
        },
      };
    });
  };

  const addVariation = (type: keyof Variations) => {
    setProductData((prev) => ({
      ...prev,
      variations: {
        ...prev.variations,
        [type]: [...prev.variations[type], ""],
      },
    }));
  };

  const removeVariation = (type: keyof Variations, index: number) => {
    setProductData((prev) => {
      const updatedVariations = [...prev.variations[type]];
      updatedVariations.splice(index, 1);
      return {
        ...prev,
        variations: {
          ...prev.variations,
          [type]: updatedVariations,
        },
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)], // Використання Array.from для перетворення FileList у масив
      }));
    }
  };

  const removeImage = (index: number) => {
    setProductData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("composition", productData.composition);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock.toString());

    productData.variations.size.forEach((size, index) => {
      formData.append(`variations[size][${index}]`, size);
    });

    productData.variations.color.forEach((color, index) => {
      formData.append(`variations[color][${index}]`, color);
    });

    for (let i = 0; i < productData.images.length; i++) {
      formData.append(`images`, productData.images[i]);
    }
    console.log(productData);
    if (accessToken)
      try {
        setAuthHeader(accessToken);
        const response = await axios.post(
          `http://localhost:3000/merch/products/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onSave(response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating product:", error);
      }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
      <form
        className="p-6 max-w-4xl mx-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Назва
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Ціна
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="composition"
              className="block text-sm font-medium text-gray-700"
            >
              Склад
            </label>
            <textarea
              id="composition"
              name="composition"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.composition}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Категорія
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Кількість на складі
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              className="mt-1 block w-full p-2 border rounded"
              value={productData.stock}
              onChange={handleInputChange}
            />
          </div>

          {/* Variations */}
          {["size", "color"].map((type) => (
            <div key={type}>
              <label className="block text-sm font-medium text-gray-700">
                {type === "size" ? "Розміри" : "Кольори"}
              </label>
              {["size", "color"].map((type) => (
                <div key={type}>
                  <label className="block text-sm font-medium text-gray-700">
                    {type === "size" ? "Розміри" : "Кольори"}
                  </label>
                  {productData.variations[type as keyof Variations].map(
                    (value: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mt-1"
                      >
                        <input
                          type="text"
                          className="block w-full p-2 border rounded"
                          value={value}
                          onChange={(e) =>
                            handleVariationsChange(
                              type as keyof Variations,
                              e.target.value,
                              index
                            )
                          }
                        />
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() =>
                            removeVariation(type as keyof Variations, index)
                          }
                        >
                          <IoCloseOutline className="h-5 w-5" />
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    className="mt-2 text-blue-500"
                    onClick={() => addVariation(type as keyof Variations)}
                  >
                    {type === "size" ? "Додати розмір" : "Додати колір"}
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-2 text-blue-500"
                onClick={() => addVariation(type as "size" | "color")}
              >
                {type === "size" ? "Додати розмір" : "Додати колір"}
              </button>
            </div>
          ))}

          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Зображення
            </label>
            <input
              id="images"
              type="file"
              multiple
              className="mt-1 block w-full p-2 border rounded"
              onChange={handleFileChange}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {productData.images.map((file, index) => (
                <div key={index} className="relative w-32 h-32 border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500"
                    onClick={() => removeImage(index)}
                  >
                    <IoCloseOutline className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Створити товар
        </button>
      </form>
    </Modal>
  );
}
