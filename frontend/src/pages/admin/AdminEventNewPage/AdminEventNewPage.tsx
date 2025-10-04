import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAdminAccessToken } from "../../../redux";
import { createEvent } from "../../../services/events";
import { generateSlug } from "../../../utils/generateSlug";

export default function AdminEventNewPage() {
  const navigate = useNavigate();
  const accessToken = useSelector(selectAdminAccessToken);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    order: 0,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));

    // Auto-generate path from title
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        path: generateSlug(value),
      }));
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length !== 6) {
        toast.error("Потрібно вибрати рівно 6 зображень для галереї");
        return;
      }
      setGalleryImages(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainImage) {
      toast.error("Додайте головне зображення");
      return;
    }

    if (galleryImages.length !== 6) {
      toast.error("Додайте рівно 6 зображень для галереї");
      return;
    }

    if (!accessToken) {
      toast.error("Не авторизовано");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("path", formData.path);
    data.append("description", formData.description);
    data.append("buttonText", formData.buttonText);
    data.append("buttonLink", formData.buttonLink);
    data.append("order", formData.order.toString());
    data.append("mainImage", mainImage);

    galleryImages.forEach((file) => {
      data.append("galleryImages", file);
    });

    try {
      await createEvent(data, accessToken);
      toast.success("Захід створено");
      navigate("/admin/events");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Помилка створення заходу");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Створити новий захід
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Назва заходу *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Path */}
        <div>
          <label
            htmlFor="path"
            className="block text-sm font-medium text-gray-700"
          >
            URL Path *
          </label>
          <input
            type="text"
            name="path"
            id="path"
            required
            value={formData.path}
            onChange={handleInputChange}
            pattern="[a-z0-9-]+"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
          <p className="mt-1 text-xs text-gray-500">
            Тільки малі літери, цифри та дефіси
          </p>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Опис *
          </label>
          <textarea
            name="description"
            id="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Button Text */}
        <div>
          <label
            htmlFor="buttonText"
            className="block text-sm font-medium text-gray-700"
          >
            Текст кнопки (опціонально)
          </label>
          <input
            type="text"
            name="buttonText"
            id="buttonText"
            value={formData.buttonText}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Button Link */}
        <div>
          <label
            htmlFor="buttonLink"
            className="block text-sm font-medium text-gray-700"
          >
            Посилання кнопки (опціонально)
          </label>
          <input
            type="url"
            name="buttonLink"
            id="buttonLink"
            value={formData.buttonLink}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Order */}
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700"
          >
            Порядок відображення
          </label>
          <input
            type="number"
            name="order"
            id="order"
            min="0"
            value={formData.order}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Main Image */}
        <div>
          <label
            htmlFor="mainImage"
            className="block text-sm font-medium text-gray-700"
          >
            Головне зображення *
          </label>
          <input
            type="file"
            name="mainImage"
            id="mainImage"
            accept="image/*"
            required
            onChange={handleMainImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {mainImage && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Preview"
                className="h-32 w-48 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div>
          <label
            htmlFor="galleryImages"
            className="block text-sm font-medium text-gray-700"
          >
            Зображення галереї (рівно 6) *
          </label>
          <input
            type="file"
            name="galleryImages"
            id="galleryImages"
            accept="image/*"
            multiple
            required
            onChange={handleGalleryImagesChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {galleryImages.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {galleryImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Gallery ${index + 1}`}
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Вибрано: {galleryImages.length} / 6
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Скасувати
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Створення..." : "Створити захід"}
          </button>
        </div>
      </form>
    </div>
  );
}
