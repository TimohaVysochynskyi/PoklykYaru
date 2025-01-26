import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ProductType } from "../../../types/Product.types";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  product: ProductType;
  onSave: (updatedProduct: ProductType) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Це поле обов'язкове"),
  price: Yup.number().required("Це поле обов'язкове"),
  category: Yup.string().required("Це поле обов'язкове"),
  stock: Yup.number().required("Це поле обов'язкове"),
  description: Yup.string().required(),
  composition: Yup.string().required(),
  variations: Yup.object().shape({
    size: Yup.array().of(Yup.string()),
    color: Yup.array().of(Yup.string()),
  }),
});

export default function AdminProductEdit({ product, onSave }: Props) {
  const [productState] = useState<ProductType>(product);

  const handleSubmit = (values: ProductType) => {
    const newProductData = {
      name: values.name,
      description: values.description,
      price: values.price,
      composition: values.composition,
      category: values.category,
      variations: values.variations,
      stock: values.stock,
      images: values.images,
    };
    onSave(newProductData);
  };

  const staticProductData = [
    { label: "Назва", name: "name" },
    { label: "Категорія", name: "category" },
    { label: "Ціна", name: "price", type: "number" },
    { label: "Кількість на складі", name: "stock", type: "number" },
    { label: "Опис", name: "description", as: "textarea" },
    { label: "Склад", name: "composition", as: "textarea" },
  ];

  return (
    <Formik
      initialValues={productState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="mt-6 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              {staticProductData.map((field) => (
                <div
                  key={field.name}
                  className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                  <dt className="text-sm font-medium text-gray-900">
                    {field.label}
                  </dt>
                  <dd className="sm:col-span-2">
                    <Field
                      name={field.name}
                      as={field.as || "input"}
                      type={field.type || "text"}
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </dd>
                </div>
              ))}

              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Розміри</dt>
                <dd className="mt-1 sm:col-span-2">
                  <FieldArray name="variations.size">
                    {({ remove, push }) => (
                      <div className="flex flex-wrap gap-2">
                        {values.variations.size.map((_item, index) => (
                          <div key={index} className="flex items-center">
                            <Field
                              name={`variations.size.${index}`}
                              className="p-2 border rounded"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 ml-2"
                            >
                              <IoCloseOutline className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="text-blue-500"
                        >
                          Додати розмір
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Кольори</dt>
                <dd className="mt-1 sm:col-span-2">
                  <FieldArray name="variations.color">
                    {({ remove, push }) => (
                      <div className="flex flex-wrap gap-2">
                        {values.variations.color.map((_item, index) => (
                          <div key={index} className="flex items-center">
                            <Field
                              name={`variations.color.${index}`}
                              className="p-2 border rounded"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 ml-2"
                            >
                              <IoCloseOutline className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="text-blue-500"
                        >
                          Додати розмір
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </dd>
              </div>
            </dl>
          </div>

          <button
            type="submit"
            className="bg-neutral-0 border-2 border-black px-5 py-1.5 text-l font-medium transition text-neutral-800 rounded hover:bg-neutral-800 hover:text-neutral-50"
          >
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
